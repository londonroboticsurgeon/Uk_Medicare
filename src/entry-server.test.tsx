import { describe, expect, it } from 'vitest';
import { renderPage } from './entry-server';

describe('server rendering', () => {
  it('renders route-specific About content without a browser', () => {
    const html = renderPage('/about-prof-hemant-sheth');

    expect(html).toContain('<h1');
    expect(html).toContain('About Prof. Hemant Sheth');
    expect(html).toContain('Independent professional evidence');
    expect(html).toContain('London North West University Healthcare NHS Trust');
    expect(html).toContain('Royal College of Surgeons of England');
    expect(html).not.toContain('keyholesurgeon.co.uk');
  });

  it('renders direct robotic-surgery answers and primary sources for crawlers', () => {
    const html = renderPage('/robotic-surgery');

    expect(html).toContain('Robotic surgery questions, answered');
    expect(html).toContain('Does the robot perform the operation by itself?');
    expect(html).toContain('Is robotic surgery always better than laparoscopic or open surgery?');
    expect(html).toContain('Evidence from the Ealing Hospital programme');
    expect(html).toContain('https://www.lnwh.nhs.uk/news/surgeon-embraces-robotic-surgery-12793');
    expect(html).not.toContain('record-breaking surgeon');
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
