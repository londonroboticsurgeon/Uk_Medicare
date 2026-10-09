import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const sitemap = await readFile(resolve(root, 'public', 'sitemap.xml'), 'utf8');
const routes = [...new Set([...sitemap.matchAll(/<loc>https:\/\/londonroboticsurgeon\.co\.uk([^<]*)<\/loc>/g)]
  .map((match) => match[1] || '/'))];
const server = await import(pathToFileURL(resolve(dist, 'server', 'entry-server.js')).href);

const escapeAttribute = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const replaceMetaContent = (html, name, content) => html.replace(
  new RegExp(`(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*("\\s*\\/?>)`, 'i'),
  `$1${escapeAttribute(content)}$2`
);

for (const route of routes) {
  const metadata = server.getRouteMetadata(route);
  const structuredData = server.getRouteStructuredData(route, metadata);
  const headSchema = structuredData
    ? `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`
    : '';
  const html = server.render(route);
  const page = replaceMetaContent(
    replaceMetaContent(
      replaceMetaContent(
        replaceMetaContent(
          replaceMetaContent(
            replaceMetaContent(template.replace(/<title>[^<]*<\/title>/i, `<title>${metadata.title}</title>`), 'title', metadata.title),
            'description', metadata.description
          ),
          'og:title', metadata.title
        ),
        'og:description', metadata.description
      ),
      'twitter:title', metadata.title
    ),
    'twitter:description', metadata.description
  )
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/i, `$1${metadata.canonicalUrl}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/?>)/i, `$1${metadata.canonicalUrl}$2`)
    .replace(/(<meta\s+property="twitter:url"\s+content=")[^"]*("\s*\/?>)/i, `$1${metadata.canonicalUrl}$2`)
    .replace('</head>', `${headSchema}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const output = route === '/' ? resolve(dist, 'index.html') : resolve(dist, route.slice(1), 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, page);
}

await rm(resolve(dist, 'server'), { recursive: true, force: true });
