import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here in the future as needed */}
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
