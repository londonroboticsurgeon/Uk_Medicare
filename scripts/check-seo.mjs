import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { publicRoutes } from '../dist-ssr/entry-server.js';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(projectRoot, 'dist');
const failures = [];
const seenTitles = new Map();

for (const route of publicRoutes) {
  const filePath = route.path === '/'
    ? join(distDir, 'index.html')
    : join(distDir, route.path.slice(1), 'index.html');
  const html = await readFile(filePath, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '';
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];

  if (!html.includes('<h1')) failures.push(`${route.path}: missing h1`);
  if (!title) failures.push(`${route.path}: missing title`);
  if (canonicals.length !== 1) failures.push(`${route.path}: expected one canonical`);
  if (canonicals[0]?.[1] !== `https://londonroboticsurgeon.co.uk${route.path === '/' ? '/' : route.path}`) {
    failures.push(`${route.path}: canonical is not self-referencing`);
  }
  if (html.includes('www.keyholesurgeon.co.uk')) failures.push(`${route.path}: retired domain leaked into HTML`);
  if (!route.indexable && !html.includes('content="noindex,follow"')) {
    failures.push(`${route.path}: noindex route missing directive`);
  }

  if (route.indexable) {
    const previousPath = seenTitles.get(title);
    if (previousPath) failures.push(`${route.path}: duplicate title also used by ${previousPath}`);
    seenTitles.set(title, route.path);
  }

  const jsonLd = html.match(/<script id="route-structured-data" type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  if (route.indexable && !jsonLd) failures.push(`${route.path}: missing JSON-LD`);
  if (jsonLd) {
    try {
      JSON.parse(jsonLd);
    } catch {
      failures.push(`${route.path}: invalid JSON-LD`);
    }
  }
}

const sitemap = await readFile(join(distDir, 'sitemap.xml'), 'utf8');
for (const route of publicRoutes) {
  const url = `https://londonroboticsurgeon.co.uk${route.path === '/' ? '/' : route.path}`;
  const included = sitemap.includes(`<loc>${url}</loc>`);
  if (included !== (route.indexable && route.includeInSitemap)) {
    failures.push(`${route.path}: sitemap inclusion mismatch`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`SEO validation passed for ${publicRoutes.length} generated routes.`);
