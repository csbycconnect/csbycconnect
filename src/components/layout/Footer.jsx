import React from 'react';

export default function Footer() {
    return (
        <footer>
            <h2>BYTEBOARD.</h2>
            <p>Department of Computer Science</p>
            <p>CHRIST (Deemed to be University), Yeshwanthpur Campus</p>
            <div className="social-links" style={{ justifyContent: 'center' }}>
                <a href="#" className="social-link">INSTA</a>
                <a href="#" className="social-link">MAIL</a>
            </div>
            <p style={{ marginTop: '3rem', opacity: 0.5, fontSize: '0.9rem' }}>© 2026 BYTEBOARD. ALL RIGHTS RESERVED. STAY RAW.</p>
        </footer>
    );
}
