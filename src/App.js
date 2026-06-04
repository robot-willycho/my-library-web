import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Library from './pages/Library';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Global Navigation Bar across all pages */}
        <Navbar />
        
        {/* Page System Traffic Controller */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          {/* Your library app lives smoothly on its own path */}
          <Route path="/library/*" element={<Library />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;