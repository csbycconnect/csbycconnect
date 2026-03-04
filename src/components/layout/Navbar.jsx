import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    return (
        <div className="top-nav-container">
            <div className="nav-shadow"></div>
            <nav className="brutal-navbar">
                <div className="logo-container">
                    <div className="logo-img">
                        {/* Placeholder for actual crest/logo icon */}
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '8px' }}>LOGO</div>
                    </div>
                    <div>
                        <div className="logo-text">CHRIST</div>
                        <div className="logo-subtext">YESHWANTHPUR</div>
                    </div>
                </div>

                <div className="nav-links">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                    <Link to="/blogs" className={location.pathname.startsWith('/blogs') ? 'active' : ''}>Blog</Link>
                    <a href="#">CS-Connect</a>
                </div>

                <div className="search-icon">
                    &#128269; {/* Simple magnifying glass Unicode */}
                </div>
            </nav>
        </div>
    );
}
