import { canonicalUrlForPath, DEFAULT_SOCIAL_IMAGE, SITE_NAME } from '../config/site';
import { PublicRoute } from '../routes/publicRoutes';

export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogType: 'website' | 'profile';
  ogImage: string;
  siteName: string;
}

export const buildPageMetadata = (route: PublicRoute): PageMetadata => ({
  title: route.title,
  description: route.description,
  canonicalUrl: canonicalUrlForPath(route.path),
  robots: route.indexable
    ? 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'
    : 'noindex,follow',
  ogType: route.kind === 'about' ? 'profile' : 'website',
  ogImage: DEFAULT_SOCIAL_IMAGE,
  siteName: SITE_NAME,
});
