import React, { useEffect, useState } from 'react';
import { TopHeader } from './components/TopHeader';
import { NavBar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CredibilityLogoTicker } from './components/CredibilityLogoTicker';
import { TreatmentsCarousel } from './components/TreatmentsCarousel';
import { TreatmentDetailsPage } from './components/TreatmentDetailsPage';
import { RoboticSurgerySection } from './components/RoboticSurgerySection';
import { RoboticSurgeryExplainerSection } from './components/RoboticSurgeryExplainerSection';
import { RoboticComparisonSection } from './components/RoboticComparisonSection';
import { RoboticAuthoritySection } from './components/RoboticAuthoritySection';
import { ClinicLocations } from './components/ClinicLocations';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { SubmitTestimonialPage } from './components/SubmitTestimonialPage';
import { isKnownTreatmentPath } from './data/treatmentHierarchy';
import { getPublicClinicById } from './data/clinics';
import { AboutPage } from './pages/AboutPage';
import { LocationPage, LocationsPage } from './pages/LocationsPage';
import { getPublicRoute } from './routes/publicRoutes';
import { buildPageMetadata } from './seo/metadata';
import { buildStructuredData } from './seo/structuredData';

type PagePath = string;

const HOME_PATH = '/';
const TREATMENTS_PATH = '/treatments';
const ROBOTIC_SURGERY_PATH = '/robotic-surgery';
const ROBOTIC_COMPARISON_PATH = '/robotic-surgery/compare';
const ABOUT_PATH = '/about-prof-hemant-sheth';
const LOCATIONS_PATH = '/locations';
const SUBMIT_TESTIMONIAL_PATH = '/submit-testimonial';

const normalizePath = (value: string): PagePath => value.replace(/\/+$/, '') || HOME_PATH;

const getCurrentPath = (initialPath?: string): PagePath => {
  const sourcePath = initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : HOME_PATH);
  const path = normalizePath(sourcePath);

  if (getPublicRoute(path)) return path;
  if (path.startsWith(`${TREATMENTS_PATH}/`) && !isKnownTreatmentPath(path)) return TREATMENTS_PATH;
  return HOME_PATH;
};

const isTreatmentPath = (path: string) =>
  path === TREATMENTS_PATH || path.startsWith(`${TREATMENTS_PATH}/`);

const getActiveTabForPath = (path: PagePath) => {
  if (isTreatmentPath(path)) return 'TREATMENTS';
  if (path === ABOUT_PATH) return 'ABOUT';
  if (path === LOCATIONS_PATH || path.startsWith(`${LOCATIONS_PATH}/`)) return 'LOCATIONS';
  if (path === ROBOTIC_SURGERY_PATH || path === ROBOTIC_COMPARISON_PATH) return 'ROBOTIC';
  if (path === SUBMIT_TESTIMONIAL_PATH) return 'PATIENT_INFO';
  return 'HOME';
};

const getActiveTabForLocation = (initialPath?: string) => {
  const path = getCurrentPath(initialPath);
  const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';

  if (path === HOME_PATH && hash === 'clinics') return 'LOCATIONS';
  return getActiveTabForPath(path);
};

const shouldUseNativeLink = (event: React.MouseEvent<HTMLAnchorElement>) =>
  event.defaultPrevented ||
  event.button !== 0 ||
  event.metaKey ||
  event.altKey ||
  event.ctrlKey ||
  event.shiftKey;

const getRouteFromHref = (href: string): { path: PagePath; hash?: string } | null => {
  const [pathPart, hashPart] = href.split('#');
  const normalizedPath = normalizePath(pathPart || HOME_PATH);

  if (!getPublicRoute(normalizedPath)) return null;
  return { path: normalizedPath, hash: hashPart || undefined };
};

const setMetaContent = (selector: string, content: string) => {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
};

const setRouteStructuredData = (path: string) => {
  const scriptId = 'route-structured-data';
  const existingScript = document.getElementById(scriptId);
  const route = getPublicRoute(path);
  const structuredData = route ? buildStructuredData(route) : null;

  if (!structuredData) {
    existingScript?.remove();
    return;
  }

  const script = existingScript instanceof HTMLScriptElement
    ? existingScript
    : document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);

  if (!existingScript) document.head.appendChild(script);
};

interface AppProps {
  initialPath?: string;
}

export function App({ initialPath }: AppProps) {
  const [currentPath, setCurrentPath] = useState<PagePath>(() => getCurrentPath(initialPath));
  const [activeTab, setActiveTab] = useState(() => getActiveTabForLocation(initialPath));
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [selectedClinicId, setSelectedClinicId] = useState<string | undefined>();

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = getCurrentPath();
      setCurrentPath(nextPath);
      setActiveTab(getActiveTabForLocation());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const route = getPublicRoute(currentPath);
    if (!route) return;

    const metadata = buildPageMetadata(route);
    document.title = metadata.title;
    setMetaContent('meta[name="title"]', metadata.title);
    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[name="robots"]', metadata.robots);
    setMetaContent('meta[property="og:type"]', metadata.ogType);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="og:url"]', metadata.canonicalUrl);
    setMetaContent('meta[property="og:image"]', metadata.ogImage);
    setMetaContent('meta[property="twitter:title"]', metadata.title);
    setMetaContent('meta[property="twitter:description"]', metadata.description);
    setMetaContent('meta[property="twitter:url"]', metadata.canonicalUrl);
    setMetaContent('meta[property="twitter:image"]', metadata.ogImage);
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute('href', metadata.canonicalUrl);
    setRouteStructuredData(currentPath);
    setActiveTab(getActiveTabForPath(currentPath));
  }, [currentPath]);

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
    if (!hash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [currentPath]);

  const handleOpenBooking = (procedureName?: string, clinicId?: string) => {
    setSelectedProcedure(procedureName ?? '');
    setSelectedClinicId(clinicId);
    setBookingModalOpen(true);
  };

  const goToPage = (path: PagePath, hash?: string) => {
    const nextPath = normalizePath(path);
    window.history.pushState({}, '', `${nextPath}${hash ? `#${hash}` : ''}`);
    setCurrentPath(nextPath);
    setActiveTab(getActiveTabForPath(nextPath));

    window.setTimeout(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  };

  const navigateToPage = (path: PagePath) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldUseNativeLink(event)) return;
    event.preventDefault();
    goToPage(path);
  };

  const handleNavNavigate = (
    href: string,
    tabId: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (shouldUseNativeLink(event)) return;
    const route = getRouteFromHref(href);
    if (!route) return;

    event.preventDefault();
    setActiveTab(tabId);
    goToPage(route.path, route.hash);
  };

  const renderMainContent = () => {
    if (isTreatmentPath(currentPath)) {
      return (
        <TreatmentDetailsPage
          currentPath={currentPath}
          onBackHome={navigateToPage(HOME_PATH)}
          onNavigate={goToPage}
          onOpenBooking={handleOpenBooking}
        />
      );
    }

    if (currentPath === ROBOTIC_SURGERY_PATH) {
      return (
        <>
          <RoboticSurgeryExplainerSection
            onOpenBooking={() => handleOpenBooking('Robotic Surgery')}
            onCompareApproaches={navigateToPage(ROBOTIC_COMPARISON_PATH)}
          />
          <RoboticAuthoritySection />
          <RoboticComparisonSection onOpenBooking={() => handleOpenBooking('Robotic Surgery')} />
        </>
      );
    }

    if (currentPath === ROBOTIC_COMPARISON_PATH) {
      return (
        <>
          <RoboticComparisonSection
            asPageHeading
            onOpenBooking={() => handleOpenBooking('Robotic Surgery')}
          />
        </>
      );
    }

    if (currentPath === SUBMIT_TESTIMONIAL_PATH) {
      return (
        <SubmitTestimonialPage
          onOpenBooking={() => handleOpenBooking()}
          onViewProfile={() => goToPage(ABOUT_PATH)}
        />
      );
    }

    if (currentPath === ABOUT_PATH) {
      return <AboutPage onOpenBooking={() => handleOpenBooking()} />;
    }

    if (currentPath === LOCATIONS_PATH) {
      return <LocationsPage onOpenBooking={handleOpenBooking} onNavigate={goToPage} />;
    }

    if (currentPath.startsWith(`${LOCATIONS_PATH}/`)) {
      const clinic = getPublicClinicById(currentPath.slice(`${LOCATIONS_PATH}/`.length));
      if (clinic) {
        return <LocationPage clinic={clinic} onOpenBooking={handleOpenBooking} onNavigate={goToPage} />;
      }
    }

    return (
      <>
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onViewProfile={() => goToPage(ABOUT_PATH)}
        />
        <CredibilityLogoTicker />
        <TreatmentsCarousel
          onViewAllTreatments={() => goToPage(TREATMENTS_PATH)}
          onViewTreatment={goToPage}
        />
        <RoboticSurgerySection
          onOpenBooking={() => handleOpenBooking('Robotic Surgery')}
          onExploreRobotic={navigateToPage(ROBOTIC_SURGERY_PATH)}
        />
        <ClinicLocations onOpenBooking={(clinicId) => handleOpenBooking(undefined, clinicId)} />
      </>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800 selection:bg-[#294363] selection:text-white">
      <TopHeader onOpenBooking={() => handleOpenBooking()} />
      <NavBar
        activeTab={activeTab}
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleNavNavigate}
      />
      <main className="min-w-0 flex-grow overflow-x-hidden bg-[#f8fbfd]">
        {renderMainContent()}
      </main>
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onViewProfile={() => goToPage(ABOUT_PATH)}
      />
      <ConsultationModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedProcedure={selectedProcedure}
        preselectedClinicId={selectedClinicId}
      />
    </div>
  );
}

export default App;
