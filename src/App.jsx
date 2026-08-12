import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/ad-agency" element={<AgencyLanding />} />
      <Route path="/ad-agency/about" element={<AboutAgency />} />
      <Route path="/ad-agency/blog" element={<BlogList />} />
      <Route path="/ad-agency/blog/:slug" element={<BlogPost />} />
      <Route path="/ad-agency/media" element={<MediaPage />} />
      <Route path="/ad-agency/contact" element={<Contact />} />
      <Route path="/ad-agency/films" element={<AgencyFilms />} />
      <Route path="/entertainment" element={<EntertainmentLanding />} />
      <Route path="/entertainment/about" element={<AboutEntertainment />} />
      <Route path="/entertainment/films" element={<EntertainmentFilms />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
