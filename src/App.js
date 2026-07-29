// ============================================================
// MESOB Sululta Branch - Single Page App
// All sections on one page, navbar scrolls smoothly
// /track route still works as standalone
// ============================================================

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Main page sections
import Hero              from './components/Hero';
import AboutSection      from './sections/AboutSection';
import ServicesSection   from './sections/ServicesSection';
import OrganizationsSection from './sections/OrganizationsSection';
import NewsSection       from './sections/NewsSection';
import FAQSection        from './sections/FAQSection';
import ComplaintSection  from './sections/ComplaintSection';
import ContactSection    from './sections/ContactSection';

// Standalone page (still accessible via URL)
import { PageLoader }    from './components/Loader';
import { Suspense, lazy } from 'react';
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// One scrollable page with all sections
const MainPage = () => (
  <>
    <div id="home">          <Hero />                  </div>
    <div id="about">         <AboutSection />           </div>
    <div id="services">      <ServicesSection />        </div>
    <div id="organizations"> <OrganizationsSection />   </div>
    <div id="news">          <NewsSection />            </div>
    <div id="faq">           <FAQSection />             </div>
    <div id="complaint">     <ComplaintSection />       </div>
    <div id="contact">       <ContactSection />         </div>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* 404 */}
          <Route path="/404" element={<NotFoundPage />} />

          {/* Everything else → single page */}
          <Route path="*" element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 pt-[62px]">
                <MainPage />
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
