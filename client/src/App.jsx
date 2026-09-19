import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SEOHead from './components/SEOHead';
import Home from './pages/Home';
import AgencyLanding from './pages/Agency/AgencyLanding';
import AboutAgency from './pages/Agency/AboutAgency';
import BlogList from './pages/Agency/BlogList';
import BlogPost from './pages/Agency/BlogPost';
import MediaPage from './pages/Agency/MediaPage';
import Contact from './pages/Agency/Contact';
import AgencyFilms from './pages/Agency/AgencyFilms';
import EntertainmentLanding from './pages/Entertainment/EntertainmentLanding';
import EntertainmentFilms from './pages/Entertainment/EntertainmentFilms';
import AboutEntertainment from './pages/Entertainment/AboutEntertainment';
import EntertainmentBlogs from './pages/Entertainment/EntertainmentBlogs';
import EntertainmentBlogPost from './pages/Entertainment/EntertainmentBlogPost';
import EntertainmentMedia from './pages/Entertainment/EntertainmentMedia';
import EntertainmentContact from './pages/Entertainment/EntertainmentContact';
import { AnimatePresence } from 'framer-motion';

import { isFilmsSubdomain, isAgencySubdomain } from './utils/subdomain';

function AnimatedRoutes() {
  const location = useLocation();
  const filmsMode = isFilmsSubdomain();
  const agencyMode = isAgencySubdomain();

  if (filmsMode) {
    return (
      <Routes location={location} key={location.pathname}>
        {/* films.redash.in Root & Subpages */}
        <Route path="/" element={<EntertainmentLanding />} />
        <Route path="/about" element={<AboutEntertainment />} />
        <Route path="/films" element={<EntertainmentFilms />} />
        <Route path="/blog" element={<EntertainmentBlogs />} />
        <Route path="/blog/:slug" element={<EntertainmentBlogPost />} />
        <Route path="/media" element={<EntertainmentMedia />} />
        <Route path="/contact" element={<EntertainmentContact />} />

        {/* Fallback path matches */}
        <Route path="/entertainment" element={<EntertainmentLanding />} />
        <Route path="/entertainment/about" element={<AboutEntertainment />} />
        <Route path="/entertainment/films" element={<EntertainmentFilms />} />
        <Route path="/entertainment/blog" element={<EntertainmentBlogs />} />
        <Route path="/entertainment/blog/:slug" element={<EntertainmentBlogPost />} />
        <Route path="/entertainment/media" element={<EntertainmentMedia />} />
        <Route path="/entertainment/contact" element={<EntertainmentContact />} />
      </Routes>
    );
  }

  if (agencyMode) {
    return (
      <Routes location={location} key={location.pathname}>
        {/* agency.redash.in Root & Subpages */}
        <Route path="/" element={<AgencyLanding />} />
        <Route path="/about" element={<AboutAgency />} />
        <Route path="/films" element={<AgencyFilms />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* Fallback path matches */}
        <Route path="/ad-agency" element={<AgencyLanding />} />
        <Route path="/ad-agency/about" element={<AboutAgency />} />
        <Route path="/ad-agency/films" element={<AgencyFilms />} />
        <Route path="/ad-agency/blog" element={<BlogList />} />
        <Route path="/ad-agency/blog/:slug" element={<BlogPost />} />
        <Route path="/ad-agency/media" element={<MediaPage />} />
        <Route path="/ad-agency/contact" element={<Contact />} />
      </Routes>
    );
  }

  // Default / redash.in Main Domain (and localhost)
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />

      {/* Agency Division (both /ad-agency and /agency routes) */}
      <Route path="/ad-agency" element={<AgencyLanding />} />
      <Route path="/ad-agency/about" element={<AboutAgency />} />
      <Route path="/ad-agency/blog" element={<BlogList />} />
      <Route path="/ad-agency/blog/:slug" element={<BlogPost />} />
      <Route path="/ad-agency/media" element={<MediaPage />} />
      <Route path="/ad-agency/contact" element={<Contact />} />
      <Route path="/ad-agency/films" element={<AgencyFilms />} />

      <Route path="/agency" element={<AgencyLanding />} />
      <Route path="/agency/about" element={<AboutAgency />} />
      <Route path="/agency/blog" element={<BlogList />} />
      <Route path="/agency/blog/:slug" element={<BlogPost />} />
      <Route path="/agency/media" element={<MediaPage />} />
      <Route path="/agency/contact" element={<Contact />} />
      <Route path="/agency/films" element={<AgencyFilms />} />

      {/* Entertainment Division (both /entertainment and /films routes) */}
      <Route path="/entertainment" element={<EntertainmentLanding />} />
      <Route path="/entertainment/about" element={<AboutEntertainment />} />
      <Route path="/entertainment/films" element={<EntertainmentFilms />} />
      <Route path="/entertainment/blog" element={<EntertainmentBlogs />} />
      <Route path="/entertainment/blog/:slug" element={<EntertainmentBlogPost />} />
      <Route path="/entertainment/media" element={<EntertainmentMedia />} />
      <Route path="/entertainment/contact" element={<EntertainmentContact />} />

      <Route path="/films" element={<EntertainmentFilms />} />
      <Route path="/about" element={<AboutAgency />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/media" element={<MediaPage />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <SEOHead />
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
