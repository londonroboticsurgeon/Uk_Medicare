import React from 'react';
import { CalendarCheck, Languages, ShieldCheck, Stethoscope } from 'lucide-react';
import { aboutPositioning, profileDetail } from '../data/about';
import { getVerified, professionalIdentity } from '../data/professionalIdentity';
import { publications } from '../data/publications';
import { isSafeToRender } from '../data/contentStatus';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  const displayName = getVerified(professionalIdentity.displayName) ?? 'Prof. Hemant Sheth';
  const verifiedPublications = publications.filter((publication) =>
    isSafeToRender(publication.status)
  );

  return (
    <article className="bg-white">
      <header className="bg-navy-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[220px_1fr] md:items-center lg:px-8 lg:py-20">
          <img
            src="/legacy-profile-prof-hemant-sheth.png"
            alt={`Portrait of ${displayName}`}
            width="220"
            height="270"
            className="mx-auto h-[270px] w-[220px] rounded-xl border border-white/20 object-cover object-top shadow-xl md:mx-0"
          />
          <div>
            <p className="text-eyebrow text-sky-300">Professional profile</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {`About ${displayName}`}
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-medium text-sky-100">
              {aboutPositioning.workingTitle}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200">
              {aboutPositioning.statement}
            </p>
            <button
              type="button"
              onClick={onOpenBooking}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-sky-400 px-5 py-3 font-bold text-navy-900 transition hover:bg-white"
            >
              <CalendarCheck className="h-5 w-5" />
              Book a consultation
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <section aria-labelledby="clinical-role-heading" className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <Stethoscope className="h-6 w-6 text-teal-700" />
            <h2 id="clinical-role-heading" className="mt-4 font-serif text-2xl font-bold text-navy-900">
              Current clinical role
            </h2>
            <p className="mt-3 leading-7 text-slate-650">{profileDetail.nhsRole}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 lg:col-span-2">
            <ShieldCheck className="h-6 w-6 text-teal-700" />
            <h2 className="mt-4 font-serif text-2xl font-bold text-navy-900">
              Professional memberships
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {profileDetail.memberships.map((membership) => (
                <li key={membership} className="rounded-lg bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
                  {membership}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="languages-heading" className="rounded-xl border border-sky-100 bg-sky-50 p-6 sm:p-8">
          <Languages className="h-6 w-6 text-teal-700" />
          <h2 id="languages-heading" className="mt-4 font-serif text-2xl font-bold text-navy-900">
            Languages
          </h2>
          <p className="mt-3 text-slate-600">Languages listed in the verified professional record:</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profileDetail.languages.map((language) => (
              <li key={language} className="rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-navy-900">
                {language}
              </li>
            ))}
          </ul>
        </section>

        {verifiedPublications.length > 0 && (
          <section aria-labelledby="research-heading">
            <p className="text-eyebrow text-teal-700">Research</p>
            <h2 id="research-heading" className="mt-2 font-serif text-3xl font-bold text-navy-900">
              Verified publication record
            </h2>
            <div className="mt-6 grid gap-4">
              {verifiedPublications.map((publication) => (
                <article key={publication.title} className="rounded-xl border border-slate-200 p-5">
                  <h3 className="font-serif text-xl font-bold text-navy-900">{publication.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {publication.authors} · {publication.year}
                    {publication.journal ? ` · ${publication.journal}` : ''}
                  </p>
                  {publication.doiOrPmid && (
                    <a
                      href={publication.doiOrPmid}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex text-sm font-bold text-teal-700 hover:underline"
                    >
                      View publication source
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
