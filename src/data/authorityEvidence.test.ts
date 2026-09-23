import { describe, expect, it } from 'vitest';
import {
  institutionalEvidence,
  roboticAnswerQuestions,
} from './authorityEvidence';

describe('authority evidence', () => {
  it('uses dated HTTPS primary sources for every published evidence statement', () => {
    expect(institutionalEvidence.length).toBeGreaterThanOrEqual(3);

    for (const evidence of institutionalEvidence) {
      expect(evidence.url.startsWith('https://')).toBe(true);
      expect(evidence.checkedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(evidence.summary.length).toBeGreaterThan(40);
    }
  });

  it('keeps answer-engine responses concise and avoids superiority claims', () => {
    expect(roboticAnswerQuestions.length).toBeGreaterThanOrEqual(5);

    for (const item of roboticAnswerQuestions) {
      expect(item.question.endsWith('?')).toBe(true);
      expect(item.answer.length).toBeGreaterThan(50);
      expect(item.answer.length).toBeLessThan(500);
      expect(item.answer.toLowerCase()).not.toContain('always superior');
      expect(item.answer.toLowerCase()).not.toContain('best surgeon');
    }
  });
});
