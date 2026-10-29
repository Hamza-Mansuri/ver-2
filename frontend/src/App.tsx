import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import InquiryModal from './components/InquiryModal';
import Hero from './sections/Hero';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Certifications from './sections/Certifications';
import Services from './sections/Services';
import Clients from './sections/Clients';
import Process from './sections/Process';
import ContentPage from './pages/ContentPage';
import SolutionsPage from './pages/SolutionsPage';
import ContactPage from './pages/ContactPage';
import DownloadCataloguesPage from './pages/DownloadCataloguesPage';
import { gomziPageRegistry } from './pages/gomzi/pageRegistry';
import { routePages } from './data/site';

const GlobalPresence = lazy(() => import('./sections/GlobalPresence'));

function Site() {
  const [inquiry, setInquiry] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const page = routePages.find(p => p.path === location.pathname);
    document.title = page
      ? `${page.title} | Gomzi Life Science`
      : 'Gomzi Life Science | Nutraceutical Manufacturing & Export';
  }, [location.pathname]);

  const open = () => setInquiry(true);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top" />
      <Header onInquiry={open} />
      <Routes>
        <Route
          path="/"
          element={
            <main id="main-content">
              <Hero />
              <About />
              <Gallery />
              <Certifications />
              <Services />
              <Clients />
              <Process onInquiry={open} />
              <Suspense fallback={<div className="map-loading" role="status">Loading our global presence…</div>}>
                <GlobalPresence onInquiry={open} />
              </Suspense>
            </main>
          }
        />
        {routePages.map(page => {
          const GomziPage = gomziPageRegistry[page.path];
          return (
            <Route
              key={page.path}
              path={page.path}
              element={
                GomziPage ? (
                  <GomziPage onInquiry={open} />
                ) : page.path === '/solutions' ? (
                  <SolutionsPage onInquiry={open} />
                ) : page.path === '/contact' ? (
                  <ContactPage onInquiry={open} />
                ) : page.path === '/download-catalogues' ? (
                  <DownloadCataloguesPage onInquiry={open} />
                ) : (
                  <ContentPage {...page} onInquiry={open} />
                )
              }
            />
          );
        })}
        <Route
          path="*"
          element={
            <main id="main-content" className="content-page">
              <div className="container">
                <p className="eyebrow">404 / PAGE NOT FOUND</p>
                <h1>Let’s get you<br />back on track.</h1>
                <Link to="/" className="button">Back to home</Link>
              </div>
            </main>
          }
        />
      </Routes>
      <Footer onInquiry={open} />
      <FloatingContact onInquiry={open} />
      <InquiryModal open={inquiry} onClose={() => setInquiry(false)} initialFormat="" />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}
