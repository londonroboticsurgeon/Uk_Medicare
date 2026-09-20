import { describe, expect, it } from 'vitest';
import { renderPage } from './entry-server';

describe('server rendering', () => {
  it('renders route-specific About content without a browser', () => {
    const html = renderPage('/about-prof-hemant-sheth');

    expect(html).toContain('<h1');
    expect(html).toContain('About Prof. Hemant Sheth');
    expect(html).not.toContain('keyholesurgeon.co.uk');
  });

  it('renders a verified location as crawlable HTML', () => {
    const html = renderPage('/locations/syon-clinic');

    expect(html).toContain('Syon Clinic');
    expect(html).toContain('941 Great West Road');
  });

  it('does not render the unsupported statistics on the homepage', () => {
    const html = renderPage('/');

    expect(html).not.toContain('surgeries performed');
    expect(html).not.toContain('research publications');
    expect(html).not.toContain('patient feedback cards');
    expect(html).not.toContain('keyholesurgeon.co.uk');
  });
});
