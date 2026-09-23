import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildPageMetadata,
  buildStructuredData,
  publicRoutes,
  renderPage,
} from '../dist-ssr/entry-server.js';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(projectRoot, 'dist');
const template = await readFile(join(distDir, 'index.html'), 'utf8');

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const renderDocument = (route) => {
  const metadata = buildPageMetadata(route);
  const structuredData = buildStructuredData(route);
  let html = template;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(metadata.title)}</title>`);
  html = html.replace(
    /(<meta name="title" content=")[^"]*("\s*\/?>)/i,
    `$1${escapeHtml(metadata.title)}$2`
  ).replace(
    /(<meta name="description" content=")[^"]*("\s*\/?>)/i,
    `$1${escapeHtml(metadata.description)}$2`
  );
  html = html.replace(
    /(<meta name="robots" content=")[^"]*("\s*\/?>)/i,
    `$1${metadata.robots}$2`
  );
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*("\s*\/?>)/i,
    `$1${metadata.canonicalUrl}$2`
  );

  const socialFields = [
    ['og:type', metadata.ogType],
    ['og:url', metadata.canonicalUrl],
    ['og:title', metadata.title],
    ['og:description', metadata.description],
    ['og:image', metadata.ogImage],
    ['twitter:url', metadata.canonicalUrl],
    ['twitter:title', metadata.title],
    ['twitter:description', metadata.description],
    ['twitter:image', metadata.ogImage],
  ];
  for (const [property, value] of socialFields) {
    html = html.replace(
      new RegExp(`(<meta property="${property}" content=")[^"]*("\\s*\\/?>)`, 'i'),
      `$1${escapeHtml(value)}$2`
    );
  }

  const jsonLd = structuredData
    ? `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`
    : '';
  html = html.replace('<!--seo-structured-data-->', jsonLd);
  html = html.replace('<!--app-html-->', renderPage(route.path));
  return html;
};

for (const route of publicRoutes) {
  const document = renderDocument(route);
  const outputPath = route.path === '/'
    ? join(distDir, 'index.html')
    : join(distDir, route.path.slice(1), 'index.html');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, document);

  // Vercel's cleanUrls option serves `/about` from `/about.html`. Keep the
  // directory index as well so the output remains portable to conventional
  // static hosts that resolve `/about/` to `/about/index.html`.
  if (route.path !== '/') {
    const cleanUrlPath = join(distDir, `${route.path.slice(1)}.html`);
    await mkdir(dirname(cleanUrlPath), { recursive: true });
    await writeFile(cleanUrlPath, document);
  }
}

const sitemapRoutes = publicRoutes.filter((route) => route.indexable && route.includeInSitemap);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map((route) => `  <url>
    <loc>https://londonroboticsurgeon.co.uk${route.path === '/' ? '/' : route.path}</loc>${route.lastModified ? `
    <lastmod>${route.lastModified}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>
`;
await writeFile(join(distDir, 'sitemap.xml'), sitemap);

const notFound = template
  .replace(/<title>.*?<\/title>/s, '<title>Page Not Found | London Robotic Surgeon</title>')
  .replace(/(<meta name="robots" content=")[^"]*("\s*\/?>)/i, '$1noindex,nofollow$2')
  .replace('<!--seo-structured-data-->', '')
  .replace(
    '<!--app-html-->',
    '<main style="max-width:48rem;margin:5rem auto;padding:2rem;font-family:system-ui"><h1>Page not found</h1><p>The requested page does not exist.</p><p><a href="/">Return to the homepage</a></p></main>'
  );
await writeFile(join(distDir, '404.html'), notFound);
