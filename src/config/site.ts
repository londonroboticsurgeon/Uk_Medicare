export const SITE_ORIGIN = 'https://londonroboticsurgeon.co.uk';
export const SITE_NAME = 'London Robotic Surgeon';
export const SURGEON_ENTITY_ID = `${SITE_ORIGIN}/#prof-hemant-sheth`;
export const WEBSITE_ENTITY_ID = `${SITE_ORIGIN}/#website`;
export const DEFAULT_SOCIAL_IMAGE = `${SITE_ORIGIN}/hero_bg_davinci_sheth.png`;

export const DEFAULT_SITE_TITLE =
  'Prof. Hemant Sheth | Upper GI, Laparoscopic & Robotic Surgeon';
export const DEFAULT_SITE_DESCRIPTION =
  'Official website of Prof. Hemant Sheth, Consultant Upper GI, Laparoscopic and Robotic Surgeon serving London and Hertfordshire.';

export const canonicalUrlForPath = (path: string) =>
  `${SITE_ORIGIN}${path === '/' ? '/' : path}`;
