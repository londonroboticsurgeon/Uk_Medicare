import { publicClinicLocations } from '../data/clinics';
import {
  getTreatmentRouteSeo,
  treatmentPublicRoutes,
} from '../data/treatmentHierarchy';

export type PublicPageKind =
  | 'home'
  | 'treatments'
  | 'robotic'
  | 'about'
  | 'locations'
  | 'location'
  | 'form';

export interface PublicRoute {
  path: string;
  kind: PublicPageKind;
  title: string;
  description: string;
  h1: string;
  indexable: boolean;
  includeInSitemap: boolean;
  lastModified?: string;
  clinicId?: string;
}

const treatmentRoutes: PublicRoute[] = treatmentPublicRoutes.map((path) => {
  const seo = getTreatmentRouteSeo(path);

  if (!seo) {
    throw new Error(`Missing SEO metadata for treatment route: ${path}`);
  }

  return {
    path,
    kind: 'treatments',
    title: seo.title,
    description: seo.description,
    h1: seo.h1,
    indexable: true,
    includeInSitemap: true,
  };
});

const locationRoutes: PublicRoute[] = publicClinicLocations.map((clinic) => ({
  path: `/locations/${clinic.id}`,
  kind: 'location',
  title: `${clinic.name} | Prof. Hemant Sheth`,
  description: `Verified clinic information for Prof. Hemant Sheth at ${clinic.name}, including address, consultation availability, travel information and appointment options.`,
  h1: clinic.name,
  indexable: true,
  includeInSitemap: true,
  clinicId: clinic.id,
}));

export const publicRoutes: PublicRoute[] = [
  {
    path: '/',
    kind: 'home',
    title: 'Prof. Hemant Sheth | Robotic Surgeon London, Laparoscopic & Upper GI Surgery',
    description:
      'Official website of Prof. Hemant Sheth, Consultant Upper GI, Laparoscopic and Robotic Surgeon serving London and Hertfordshire.',
    h1: 'Specialist Robotic & Laparoscopic Upper GI Surgeon in London',
    indexable: true,
    includeInSitemap: true,
  },
  ...treatmentRoutes,
  {
    path: '/robotic-surgery',
    kind: 'robotic',
    title: 'Robotic Surgeon London | Robotic Surgery Information',
    description:
      'Patient-focused information about robotic-assisted surgery in London from Prof. Hemant Sheth, Robotic Surgeon, covering assessment and treatment planning.',
    h1: 'Robotic-Assisted Surgery',
    indexable: true,
    includeInSitemap: true,
    lastModified: '2026-09-21',
  },
  {
    path: '/robotic-surgery/compare',
    kind: 'robotic',
    title: 'Open, Laparoscopic & Robotic Surgery Compared',
    description:
      'A patient guide to the differences between open, laparoscopic and robotic-assisted surgical approaches.',
    h1: 'Compare Surgical Approaches',
    indexable: true,
    includeInSitemap: true,
  },
  {
    path: '/about-prof-hemant-sheth',
    kind: 'about',
    title: 'About Prof. Hemant Sheth | Consultant Upper GI Surgeon in London',
    description:
      'Verified professional profile of Prof. Hemant Sheth, Consultant Upper GI Surgeon in London, including his clinical role, areas of practice, memberships and languages.',
    h1: 'About Prof. Hemant Sheth',
    indexable: true,
    includeInSitemap: true,
    lastModified: '2026-09-21',
  },
  {
    path: '/locations',
    kind: 'locations',
    title: 'Clinic Locations | Prof. Hemant Sheth',
    description:
      'View verified private clinic locations, consultation availability, addresses and appointment information for Prof. Hemant Sheth.',
    h1: 'Clinic Locations',
    indexable: true,
    includeInSitemap: true,
  },
  ...locationRoutes,
  {
    path: '/submit-testimonial',
    kind: 'form',
    title: 'Submit Patient Feedback | Prof. Hemant Sheth',
    description: 'Submit patient feedback for review by the practice team.',
    h1: 'Submit Patient Feedback',
    indexable: false,
    includeInSitemap: false,
  },
];

export const getPublicRoute = (path: string) => {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  return publicRoutes.find((route) => route.path === normalizedPath) ?? null;
};
