import {
  SITE_NAME,
  SITE_ORIGIN,
  SURGEON_ENTITY_ID,
  WEBSITE_ENTITY_ID,
  canonicalUrlForPath,
} from '../config/site';
import { getPublicClinicById } from '../data/clinics';
import { professionalIdentity, getVerified } from '../data/professionalIdentity';
import {
  getTreatmentBreadcrumbs,
  getTreatmentCategoryById,
  getTreatmentPageByPath,
} from '../data/treatmentHierarchy';
import { PublicRoute } from '../routes/publicRoutes';

type SchemaNode = Record<string, unknown>;

const surgeonNode = (): SchemaNode => ({
  '@type': ['Person', 'Physician'],
  '@id': SURGEON_ENTITY_ID,
  name: getVerified(professionalIdentity.displayName) ?? 'Prof. Hemant Sheth',
  jobTitle: getVerified(professionalIdentity.workingTitle),
  url: canonicalUrlForPath('/about-prof-hemant-sheth'),
});

const websiteNode = (): SchemaNode => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ENTITY_ID,
  name: SITE_NAME,
  url: `${SITE_ORIGIN}/`,
});

const breadcrumbNode = (route: PublicRoute): SchemaNode | null => {
  const breadcrumbs = route.kind === 'treatments'
    ? getTreatmentBreadcrumbs(route.path)
    : route.kind === 'about'
      ? [{ label: 'Home', path: '/' }, { label: route.h1, path: route.path }]
      : route.kind === 'locations'
        ? [{ label: 'Home', path: '/' }, { label: route.h1, path: route.path }]
        : route.kind === 'location'
          ? [
              { label: 'Home', path: '/' },
              { label: 'Locations', path: '/locations' },
              { label: route.h1, path: route.path },
            ]
          : [];

  if (breadcrumbs.length < 2) return null;

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrlForPath(route.path)}#breadcrumb`,
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.label,
      item: canonicalUrlForPath(breadcrumb.path),
    })),
  };
};

export const buildStructuredData = (route: PublicRoute) => {
  if (!route.indexable) return null;

  const canonicalUrl = canonicalUrlForPath(route.path);
  const graph: SchemaNode[] = [websiteNode(), surgeonNode()];
  const breadcrumb = breadcrumbNode(route);
  if (breadcrumb) graph.push(breadcrumb);

  const page: SchemaNode = {
    '@type': route.kind === 'about' ? 'ProfilePage' : 'MedicalWebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: route.title,
    description: route.description,
    isPartOf: { '@id': WEBSITE_ENTITY_ID },
    about: { '@id': SURGEON_ENTITY_ID },
  };
  if (breadcrumb) page.breadcrumb = { '@id': `${canonicalUrl}#breadcrumb` };
  graph.push(page);

  const treatment = getTreatmentPageByPath(route.path);
  if (treatment) {
    const category = getTreatmentCategoryById(treatment.categoryId);
    graph.push({
      '@type': 'MedicalProcedure',
      '@id': `${canonicalUrl}#procedure`,
      name: treatment.title,
      description: treatment.answerFirst,
      bodyLocation: category?.title,
      url: canonicalUrl,
    });
  }

  if (route.kind === 'location' && route.clinicId) {
    const clinic = getPublicClinicById(route.clinicId);
    if (clinic) {
      graph.push({
        '@type': 'Place',
        '@id': `${canonicalUrl}#location`,
        name: clinic.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: clinic.address,
          postalCode: clinic.postcode,
          addressCountry: 'GB',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: clinic.latitude,
          longitude: clinic.longitude,
        },
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};
