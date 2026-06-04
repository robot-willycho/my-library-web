 import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="global-header" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="logo" style={{ fontWeight: '700', fontSize: '1.2rem', color: '#0f172a' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Willy.Dev</Link>
      </div>
      <div className="nav-links" style={{ display: 'flex', gap: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>Home</Link>
        <Link to="/projects" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>Projects</Link>
        <Link to="/library" style={{ textDecoration: 'none', color: '#64748b', fontWeight: '500' }}>Library</Link>
      </div>
    </nav>
  );
}

export default Navbar;
