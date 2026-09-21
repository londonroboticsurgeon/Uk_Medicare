import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import {
  AUTHORITY_CONTENT_LAST_REVIEWED,
  professionalProfileEvidence,
} from '../data/authorityEvidence';

export const ProfessionalEvidenceSection: React.FC = () => (
  <section aria-labelledby="professional-evidence-heading">
    <p className="text-eyebrow text-teal-700">Corroborated public record</p>
    <h2 id="professional-evidence-heading" className="mt-2 font-serif text-3xl font-bold text-navy-900">
      Independent professional evidence
    </h2>
    <p className="mt-4 max-w-3xl leading-7 text-slate-600">
      These statements link directly to NHS and professional-body sources. Dated activity is
      presented with its original reporting date and is not treated as a live total.
    </p>

    <div className="mt-6 grid gap-4">
      {professionalProfileEvidence.map((evidence) => (
        <article key={evidence.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-teal-700" aria-hidden="true" />
            <div>
              <p className="text-meta font-bold uppercase tracking-[0.1em] text-sky-700">
                {evidence.sourceName}
                {evidence.publishedDate ? ` · ${evidence.publishedDate}` : ''}
              </p>
              <h3 className="mt-2 font-serif text-xl font-bold text-navy-900">
                {evidence.sourceTitle}
              </h3>
              <p className="mt-3 leading-7 text-slate-650">{evidence.summary}</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">{evidence.scopeNote}</p>
              <a
                href={evidence.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:underline"
              >
                View the institutional source
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>

    <p className="mt-4 text-sm text-slate-500">
      Source links last checked {AUTHORITY_CONTENT_LAST_REVIEWED}.
    </p>
  </section>
);
