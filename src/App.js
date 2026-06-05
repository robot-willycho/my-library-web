import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/Library';
import Projects from './pages/Projects'; // Restored missing project import
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        
        {/* --- DYNAMIC OVERLAY FLOATING HEADER --- */}
        <header className="global-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Left Side: Brand Logo */}
          <div className="brand-logo">
            <Link to="/" style={{ textDecoration: 'none', color: '#0f172a', fontWeight: '700', fontSize: '1.25rem' }}>
              Willy.Dev
            </Link>
          </div>

          {/* Center/Right-leaning Nav Controls */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', marginLeft: 'auto', marginRight: '40px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '600', fontSize: '0.95rem' }}>Home</Link>
            <Link to="/projects" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '600', fontSize: '0.95rem' }}>Projects</Link>
            <Link to="/library" style={{ textDecoration: 'none', color: '#0f172a', fontWeight: '600', fontSize: '0.95rem' }}>Library</Link>
          </nav>

          {/* Right Side: QR Code Anchor Badge pointing to your website */}
          <div className="qr-section">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://192.168.1.105:3000" 
              alt="Website Portfolio QR Link" 
            />
            <p>Scan to view<br /><strong>Live Portfolio</strong></p>
          </div>

        </header>

        {/* --- MASTER APPLICATIONS CORE ENGINE VIEWPORTS --- */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} /> {/* Restored missing operational route */}
            <Route path="/library" element={<Library />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;