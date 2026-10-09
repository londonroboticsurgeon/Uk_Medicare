import {
  getTreatmentBreadcrumbs,
  getTreatmentCategoryById,
  getTreatmentPageByPath,
  getTreatmentRouteSeo,
} from './data/treatmentHierarchy';

export const SITE_ORIGIN = 'https://londonroboticsurgeon.co.uk';

const HOME_PATH = '/';
const ROBOTIC_SURGERY_PATH = '/robotic-surgery';
const ROBOTIC_COMPARISON_PATH = '/robotic-surgery/compare';
const SUBMIT_TESTIMONIAL_PATH = '/submit-testimonial';

const SITE_TITLE =
  'Prof. Hemant Sheth | Consultant Upper GI, Laparoscopic & Robotic Surgeon London & Hertfordshire';
const DEFAULT_DESCRIPTION =
  'Prof. Hemant Sheth is a Consultant Upper GI, Laparoscopic and Robotic Surgeon providing private care across London and Hertfordshire.';

export type RouteMetadata = {
  title: string;
  description: string;
  canonicalUrl: string;
};

export const getCanonicalUrl = (path: string) => `${SITE_ORIGIN}${path === HOME_PATH ? '/' : path}`;

export function getRouteMetadata(path: string): RouteMetadata {
  const treatmentSeo = getTreatmentRouteSeo(path);

  if (treatmentSeo) {
    return {
      title: treatmentSeo.title,
      description: treatmentSeo.description,
      canonicalUrl: getCanonicalUrl(treatmentSeo.canonicalPath),
    };
  }

  if (path === ROBOTIC_SURGERY_PATH) {
    return {
      title: `Robotic Surgery | ${SITE_TITLE}`,
      description:
        'Robotic surgery information from Prof. Hemant Sheth, including how robotic-assisted procedures may support selected upper GI and laparoscopic surgery.',
      canonicalUrl: getCanonicalUrl(ROBOTIC_SURGERY_PATH),
    };
  }

  if (path === ROBOTIC_COMPARISON_PATH) {
    return {
      title: `Compare Surgical Approaches | ${SITE_TITLE}`,
      description:
        'Compare open, laparoscopic and robotic-assisted surgical approaches with patient-focused information from Prof. Hemant Sheth.',
      canonicalUrl: getCanonicalUrl(ROBOTIC_COMPARISON_PATH),
    };
  }

  if (path === SUBMIT_TESTIMONIAL_PATH) {
    return {
      title: `Submit Your Testimonial | ${SITE_TITLE}`,
      description: 'Submit patient feedback for Prof. Hemant Sheth through the website testimonial page.',
      canonicalUrl: getCanonicalUrl(SUBMIT_TESTIMONIAL_PATH),
    };
  }

  return {
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonicalUrl: getCanonicalUrl(HOME_PATH),
  };
}

export function getRouteStructuredData(path: string, metadata: RouteMetadata) {
  if (!path.startsWith('/treatments')) return null;

  const breadcrumbs = getTreatmentBreadcrumbs(path);
  const treatment = getTreatmentPageByPath(path);
  const category = treatment ? getTreatmentCategoryById(treatment.categoryId) : null;

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${metadata.canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.label,
        item: getCanonicalUrl(breadcrumb.path),
      })),
    },
    {
      '@type': 'WebPage',
      '@id': `${metadata.canonicalUrl}#webpage`,
      url: metadata.canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      breadcrumb: { '@id': `${metadata.canonicalUrl}#breadcrumb` },
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: 'Prof. Hemant Sheth',
        url: `${SITE_ORIGIN}/`,
      },
    },
  ];

  if (treatment) {
    graph.push({
      '@type': 'MedicalProcedure',
      '@id': `${metadata.canonicalUrl}#procedure`,
      name: treatment.title,
      description: treatment.answerFirst,
      bodyLocation: category?.title,
      url: metadata.canonicalUrl,
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
