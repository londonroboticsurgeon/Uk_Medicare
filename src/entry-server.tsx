import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { getRouteMetadata, getRouteStructuredData } from './routeSeo';

export function render(path: string) {
  return renderToString(<App initialPath={path} />);
}

export { getRouteMetadata, getRouteStructuredData };
