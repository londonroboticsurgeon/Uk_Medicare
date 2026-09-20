import React from 'react';
import { CalendarCheck, UserRound } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onViewProfile: () => void;
}

const highPriorityImageProps = { fetchpriority: 'high' };

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onViewProfile }) => (
  <section className="relative flex min-h-[650px] w-full items-center overflow-hidden bg-[#081424] sm:min-h-[680px] lg:min-h-[730px]">
    <picture className="absolute inset-0 h-full w-full">
      <source
        type="image/webp"
        srcSet="/hero-davinci-640.webp 640w, /hero-davinci-960.webp 960w, /hero-davinci-1440.webp 1440w"
        sizes="100vw"
      />
      <img
        src="/hero_bg_davinci_sheth.png"
        alt="Prof. Hemant Sheth at a robotic surgery console"
        width="1440"
        height="768"
        {...highPriorityImageProps}
        decoding="async"
        className="h-full w-full object-cover object-[62%_center] md:object-right"
      />
    </picture>

    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{
        background:
          'linear-gradient(90deg, rgba(8,20,36,0.98) 0%, rgba(8,20,36,0.92) 34%, rgba(8,20,36,0.54) 58%, rgba(8,20,36,0.08) 80%)',
      }}
    />

    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-[610px]">
        <p className="text-eyebrow text-white">Prof. Hemant Sheth</p>
        <div className="mt-2 h-0.5 w-14 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]" />

        <h1 className="mt-5 max-w-[580px] font-serif text-[clamp(2.55rem,6vw,4rem)] font-semibold leading-[1] tracking-[-0.025em] text-white drop-shadow-sm">
          Specialist Robotic &amp; Laparoscopic Upper GI Surgeon
        </h1>

        <p className="text-eyebrow mt-5 text-sky-200">In London &amp; Hertfordshire</p>
        <p className="text-lead mt-4 max-w-[500px] text-sky-100">
          Consultant-led assessment and patient-focused surgical care for upper gastrointestinal conditions.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpenBooking}
            className="text-button inline-flex items-center justify-center gap-2 rounded-lg bg-sky-400 px-5 py-3 font-bold uppercase tracking-[0.08em] text-[#081424] shadow-[0_10px_24px_rgba(56,189,248,0.28)] transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <CalendarCheck className="h-4 w-4" />
            Book Consultation
          </button>

          <a
            href="/about-prof-hemant-sheth"
            onClick={(event) => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              onViewProfile();
            }}
            className="text-button inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/[0.08] px-5 py-3 font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/[0.15] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <UserRound className="h-4 w-4" />
            View Profile
          </a>
        </div>
      </div>
    </div>
  </section>
);
