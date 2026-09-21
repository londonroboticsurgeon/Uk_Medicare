import React from 'react';
import { BookOpenCheck, ExternalLink, MessageCircleQuestion } from 'lucide-react';
import {
  AUTHORITY_CONTENT_LAST_REVIEWED,
  roboticAnswerQuestions,
  roboticInstitutionalEvidence,
} from '../data/authorityEvidence';

const formatReviewDate = (value: string) => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date(`${value}T00:00:00Z`));

export const RoboticAuthoritySection: React.FC = () => (
  <section className="border-y border-slate-200 bg-white py-16 text-slate-800 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-eyebrow text-teal-700">Direct patient answers</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">
          Robotic surgery questions, answered
        </h2>
        <p className="mt-4 text-body text-slate-600">
          Clear, general answers designed to explain the technology without implying that one
          surgical approach is right for every patient.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {roboticAnswerQuestions.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <MessageCircleQuestion className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
              <div>
                <h3 className="font-serif text-xl font-bold leading-snug text-navy-900">
                  {item.question}
                </h3>
                <p className="mt-3 text-body-small leading-7 text-slate-650">{item.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section aria-labelledby="robotic-evidence-heading" className="mt-12 rounded-2xl bg-[#f1f7fa] p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <BookOpenCheck className="mt-1 h-6 w-6 shrink-0 text-teal-700" aria-hidden="true" />
          <div>
            <p className="text-eyebrow text-teal-700">Primary institutional sources</p>
            <h2 id="robotic-evidence-heading" className="mt-2 font-serif text-3xl font-bold text-navy-900">
              Evidence from the Ealing Hospital programme
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {roboticInstitutionalEvidence.map((evidence) => (
            <article key={evidence.id} className="rounded-xl border border-sky-100 bg-white p-5">
              <p className="text-meta font-bold uppercase tracking-[0.1em] text-sky-700">
                {evidence.sourceName}
                {evidence.publishedDate ? ` · ${evidence.publishedDate}` : ''}
              </p>
              <h3 className="mt-2 font-serif text-xl font-bold text-navy-900">
                {evidence.sourceTitle}
              </h3>
              <p className="mt-3 text-body-small leading-7 text-slate-650">{evidence.summary}</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">{evidence.scopeNote}</p>
              <a
                href={evidence.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:underline"
              >
                Read the NHS source
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-5 text-sm text-slate-500">
          Sources checked {formatReviewDate(AUTHORITY_CONTENT_LAST_REVIEWED)}. Figures are tied to
          the publication dates and are not presented as current personal totals.
        </p>
      </section>
    </div>
  </section>
);
