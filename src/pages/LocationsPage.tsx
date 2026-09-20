import React from 'react';
import { CalendarCheck, Clock3, MapPin, Navigation } from 'lucide-react';
import {
  ClinicLocation,
  getClinicAvailabilitySummary,
  publicClinicLocations,
} from '../data/clinics';

interface LocationsPageProps {
  onOpenBooking: (clinicId?: string) => void;
  onNavigate: (path: string) => void;
}

const LocationCard = ({
  clinic,
  onOpenBooking,
  onNavigate,
}: {
  clinic: ClinicLocation;
  onOpenBooking: (clinicId?: string) => void;
  onNavigate: (path: string) => void;
}) => {
  const availability = getClinicAvailabilitySummary(clinic);
  const path = `/locations/${clinic.id}`;

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-eyebrow text-teal-700">{clinic.network}</p>
      <h2 className="mt-2 font-serif text-2xl font-bold text-navy-900">
        <a
          href={path}
          onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            onNavigate(path);
          }}
          className="hover:text-teal-700"
        >
          {clinic.name}
        </a>
      </h2>
      <address className="mt-4 flex gap-2 not-italic leading-7 text-slate-600">
        <MapPin className="mt-1 h-5 w-5 shrink-0 text-teal-700" />
        <span>{clinic.address}, {clinic.postcode}</span>
      </address>
      <div className="mt-4 flex gap-2 text-sm text-slate-600">
        <Clock3 className="h-5 w-5 shrink-0 text-teal-700" />
        <span>{availability.join('; ')}</span>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={path} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-navy-900 hover:border-teal-500">
          Clinic details
        </a>
        <button
          type="button"
          onClick={() => onOpenBooking(clinic.id)}
          className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-navy-800"
        >
          <CalendarCheck className="h-4 w-4" />
          Book here
        </button>
      </div>
    </article>
  );
};

export const LocationsPage: React.FC<LocationsPageProps> = ({ onOpenBooking, onNavigate }) => (
  <article className="bg-[#f8fbfd]">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-eyebrow text-teal-700">Verified practice information</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-navy-900 sm:text-5xl">Clinic Locations</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          View the currently verified private clinic locations, consultation availability and appointment options for Prof. Hemant Sheth.
        </p>
      </div>
    </header>
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-2">
        {publicClinicLocations.map((clinic) => (
          <LocationCard
            key={clinic.id}
            clinic={clinic}
            onOpenBooking={onOpenBooking}
            onNavigate={onNavigate}
          />
        ))}
      </div>
      <aside className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        Clinic schedules can change. Please confirm your appointment time with the practice or hospital before travelling.
      </aside>
    </div>
  </article>
);

interface LocationPageProps {
  clinic: ClinicLocation;
  onOpenBooking: (clinicId?: string) => void;
  onNavigate: (path: string) => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({ clinic, onOpenBooking, onNavigate }) => {
  const availability = getClinicAvailabilitySummary(clinic);

  return (
    <article className="bg-white">
      <header className="bg-navy-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-sky-200">
            <a href="/" className="hover:text-white">Home</a>
            <span aria-hidden="true"> / </span>
            <a href="/locations" className="hover:text-white">Locations</a>
          </nav>
          <p className="text-eyebrow mt-6 text-sky-300">{clinic.network}</p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">{clinic.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{clinic.tagline}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8 lg:py-20">
        <div className="space-y-10">
          <section aria-labelledby="address-heading">
            <h2 id="address-heading" className="font-serif text-3xl font-bold text-navy-900">Address and travel</h2>
            <address className="mt-5 not-italic text-lg leading-8 text-slate-700">
              {clinic.address}<br />{clinic.postcode}
            </address>
            <p className="mt-4 leading-7 text-slate-600">{clinic.parkingInfo}</p>
            <a
              href={clinic.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-bold text-teal-700 hover:underline"
            >
              <Navigation className="h-5 w-5" />
              Open directions
            </a>
          </section>

          <section aria-labelledby="availability-heading">
            <h2 id="availability-heading" className="font-serif text-3xl font-bold text-navy-900">Consultation availability</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {availability.map((period) => (
                <li key={period} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 font-semibold text-slate-700">
                  {period}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Availability is informational and must be confirmed when booking.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-sky-100 bg-sky-50 p-6">
          <h2 className="font-serif text-2xl font-bold text-navy-900">Appointments</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Contact the practice to discuss an appointment at this location.
          </p>
          <button
            type="button"
            onClick={() => onOpenBooking(clinic.id)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-3 font-bold text-white hover:bg-navy-800"
          >
            <CalendarCheck className="h-5 w-5" />
            Book consultation
          </button>
          <a
            href="/locations"
            onClick={(event) => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              onNavigate('/locations');
            }}
            className="mt-4 block text-center text-sm font-bold text-teal-700 hover:underline"
          >
            View all locations
          </a>
        </aside>
      </div>
    </article>
  );
};
