import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Team() {
    return (
        <div>
            <Navbar />
            <main className="main-layout" style={{ minHeight: '60vh', padding: '4rem 2rem' }}>
                <h1 style={{ color: 'var(--c-white)' }}>Team (Coming Soon)</h1>
            </main>
            <Footer />
        </div>
    );
}
