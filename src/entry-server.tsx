import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export const renderPage = (path: string) => renderToString(<App initialPath={path} />);

export { buildPageMetadata } from './seo/metadata';
export { buildStructuredData } from './seo/structuredData';
export { publicRoutes } from './routes/publicRoutes';
