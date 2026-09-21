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
  professionalProfileEvidence,
  roboticAnswerQuestions,
  roboticInstitutionalEvidence,
} from '../data/authorityEvidence';
import {
  getTreatmentBreadcrumbs,
  getTreatmentCategoryById,
  getTreatmentPageByPath,
} from '../data/treatmentHierarchy';
import { PublicRoute } from '../routes/publicRoutes';

type SchemaNode = Record<string, unknown>;

const surgeonNode = (): SchemaNode => {
  const memberships = getVerified(professionalIdentity.memberships) ?? [];
  const languages = getVerified(professionalIdentity.languages) ?? [];

  return {
    '@type': ['Person', 'Physician'],
    '@id': SURGEON_ENTITY_ID,
    name: getVerified(professionalIdentity.displayName) ?? 'Prof. Hemant Sheth',
    jobTitle: getVerified(professionalIdentity.workingTitle),
    url: canonicalUrlForPath('/about-prof-hemant-sheth'),
    affiliation: {
      '@type': 'Organization',
      name: 'London North West University Healthcare NHS Trust',
      url: 'https://www.lnwh.nhs.uk/',
    },
    memberOf: memberships.map((name) => ({
      '@type': 'Organization',
      name,
    })),
    knowsLanguage: languages,
    knowsAbout: [
      'Upper gastrointestinal surgery',
      'Hepatobiliary surgery',
      'Laparoscopic surgery',
      'Robotic-assisted surgery',
    ],
    subjectOf: professionalProfileEvidence.map((evidence) => ({
      '@type': evidence.schemaType,
      name: evidence.sourceTitle,
      url: evidence.url,
      publisher: {
        '@type': 'Organization',
        name: evidence.sourceName,
      },
      ...(evidence.publishedDate ? { datePublished: evidence.publishedDate } : {}),
    })),
  };
};

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
    ...(route.lastModified ? { dateModified: route.lastModified } : {}),
  };
  if (route.kind === 'about') {
    page.mainEntity = { '@id': SURGEON_ENTITY_ID };
    page.citation = professionalProfileEvidence.map((evidence) => evidence.url);
  }
  if (breadcrumb) page.breadcrumb = { '@id': `${canonicalUrl}#breadcrumb` };
  graph.push(page);

  const treatment = getTreatmentPageByPath(route.path);
  if (treatment) {
    const category = getTreatmentCategoryById(treatment.categoryId);
    const procedureId = `${canonicalUrl}#procedure`;
    graph.push({
      '@type': 'MedicalProcedure',
      '@id': procedureId,
      name: treatment.title,
      description: treatment.answerFirst,
      bodyLocation: category?.title,
      url: canonicalUrl,
    });
    page.mainEntity = { '@id': procedureId };
  }

  if (route.path === '/robotic-surgery') {
    const faqId = `${canonicalUrl}#faq`;
    page.citation = roboticInstitutionalEvidence.map((evidence) => evidence.url);
    page.mainEntity = { '@id': faqId };
    graph.push({
      '@type': 'FAQPage',
      '@id': faqId,
      mainEntity: roboticAnswerQuestions.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
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
