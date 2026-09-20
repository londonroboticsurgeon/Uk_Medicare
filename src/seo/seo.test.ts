import { describe, expect, it } from 'vitest';
import { SITE_ORIGIN } from '../config/site';
import { publicClinicLocations } from '../data/clinics';
import { buildPageMetadata } from './metadata';
import { buildStructuredData } from './structuredData';
import { getPublicRoute, publicRoutes } from '../routes/publicRoutes';

describe('public SEO route manifest', () => {
  it('uses the London Robotic Surgeon apex domain as the only public origin', () => {
    expect(SITE_ORIGIN).toBe('https://londonroboticsurgeon.co.uk');
    expect(JSON.stringify(publicRoutes)).not.toContain('keyholesurgeon.co.uk');
  });

  it('contains unique normalized paths', () => {
    const paths = publicRoutes.map((route) => route.path);

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every((path) => path === '/' || (!path.endsWith('/') && path.startsWith('/')))).toBe(true);
    expect(getPublicRoute('/locations/')).toEqual(getPublicRoute('/locations'));
    expect(getPublicRoute('/not-a-real-page')).toBeNull();
  });

  it('publishes crawlable About and approved location routes', () => {
    expect(getPublicRoute('/about-prof-hemant-sheth')?.indexable).toBe(true);
    expect(getPublicRoute('/locations')?.indexable).toBe(true);

    for (const clinic of publicClinicLocations) {
      expect(getPublicRoute(`/locations/${clinic.id}`)?.indexable).toBe(true);
    }
  });

  it('keeps the testimonial form out of search and the sitemap', () => {
    const route = getPublicRoute('/submit-testimonial');

    expect(route).toMatchObject({ indexable: false, includeInSitemap: false });
  });
});

describe('page metadata', () => {
  it('creates one self-referencing canonical for a nested treatment route', () => {
    const route = getPublicRoute('/treatments/upper-gi/endoscopy');
    expect(route).toBeDefined();

    const metadata = buildPageMetadata(route!);

    expect(metadata.canonicalUrl).toBe(
      'https://londonroboticsurgeon.co.uk/treatments/upper-gi/endoscopy'
    );
    expect(metadata.robots).toBe('index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1');
    expect(metadata.title).not.toBe('');
    expect(metadata.description).not.toBe('');
  });

  it('marks the testimonial form noindex,follow', () => {
    const route = getPublicRoute('/submit-testimonial');
    expect(route).toBeDefined();

    expect(buildPageMetadata(route!).robots).toBe('noindex,follow');
  });

  it('uses profile Open Graph metadata only for the About page', () => {
    expect(buildPageMetadata(getPublicRoute('/about-prof-hemant-sheth')!).ogType).toBe('profile');
    expect(buildPageMetadata(getPublicRoute('/')!).ogType).toBe('website');
  });
});

describe('structured data', () => {
  it('uses the same canonical entity identifiers on the About page', () => {
    const route = getPublicRoute('/about-prof-hemant-sheth');
    expect(route).toBeDefined();

    const json = JSON.stringify(buildStructuredData(route!));

    expect(json).toContain('https://londonroboticsurgeon.co.uk/#prof-hemant-sheth');
    expect(json).toContain('https://londonroboticsurgeon.co.uk/about-prof-hemant-sheth');
    expect(json).not.toContain('keyholesurgeon.co.uk');
  });

  it('does not emit structured data for a noindex form', () => {
    const route = getPublicRoute('/submit-testimonial');
    expect(route).toBeDefined();

    expect(buildStructuredData(route!)).toBeNull();
  });

  it('builds route-appropriate graphs for home, treatments and location indexes', () => {
    const home = JSON.stringify(buildStructuredData(getPublicRoute('/')!));
    const treatmentIndex = JSON.stringify(buildStructuredData(getPublicRoute('/treatments')!));
    const category = JSON.stringify(buildStructuredData(getPublicRoute('/treatments/upper-gi')!));
    const treatment = JSON.stringify(
      buildStructuredData(getPublicRoute('/treatments/upper-gi/endoscopy')!)
    );
    const locations = JSON.stringify(buildStructuredData(getPublicRoute('/locations')!));

    expect(home).toContain('MedicalWebPage');
    expect(home).not.toContain('BreadcrumbList');
    expect(treatmentIndex).toContain('BreadcrumbList');
    expect(category).toContain('BreadcrumbList');
    expect(treatment).toContain('MedicalProcedure');
    expect(locations).toContain('BreadcrumbList');
  });

  it('includes verified place data on a clinic page', () => {
    const route = getPublicRoute('/locations/syon-clinic');
    expect(route).toBeDefined();

    const json = JSON.stringify(buildStructuredData(route!));
    expect(json).toContain('GeoCoordinates');
    expect(json).toContain('TW8 9DU');
  });

  it('omits place data when a location route does not resolve to an approved clinic', () => {
    const data = buildStructuredData({
      path: '/locations/unapproved-clinic',
      kind: 'location',
      title: 'Unapproved clinic',
      description: 'Not a public clinic record.',
      h1: 'Unapproved clinic',
      indexable: true,
      includeInSitemap: false,
      clinicId: 'unapproved-clinic',
    });

    expect(JSON.stringify(data)).not.toContain('GeoCoordinates');
  });
});
