import React from 'react';
import '../../styles/components.css';
import FloatingLines from '../shared/FloatingLines';
import StaggeredMenu from '../shared/StaggeredMenu';

export default function WelcomeHero() {
    return (
        <div className="welcome-hero-wrapper" style={{ position: 'relative', width: '100%', marginBottom: '4rem' }}>
            <div className="article-wrapper" style={{ minHeight: '500px' }}>
                <div className="article-shadow" style={{ top: '15px', left: '15px' }}></div>
                <div className="article-card" style={{ padding: 0, position: 'relative', overflow: 'visible', minHeight: '500px', display: 'flex', alignItems: 'center', backgroundColor: 'var(--c-dark-blue)', border: 'none' }}>

                    {/* Staggered Menu — top-right of the hero */}
                    <StaggeredMenu />

                    {/* Background Floating Lines */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, pointerEvents: 'none' }}>
                        <FloatingLines
                            enabledWaves={['top', 'middle', 'bottom']}
                            lineCount={5}
                            lineDistance={5}
                            bendRadius={5}
                            bendStrength={-0.5}
                            interactive={true}
                            parallax={true}
                            linesGradient={['#ffffff', '#007BFF', '#f7d000']} // White, blue, yellow
                        />
                    </div>

                    {/* Foreground brutalist typography overlay */}
                    <div style={{ position: 'relative', zIndex: 2, padding: '4rem', width: '100%', maxWidth: '800px', pointerEvents: 'auto' }}>
                        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--c-white)', lineHeight: 1.1, marginBottom: '1.5rem', textShadow: '2px 2px 0 #000' }}>
                            Welcome to ByteBoard<span className="blinking-cursor">_</span>
                        </h1>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', lineHeight: 1.6, maxWidth: '600px', textShadow: '1px 1px 0 #000' }}>
                            The official editorial board of the Department of Computer Science, CHRIST (Deemed to be University).
                            Where logic meets narrative.
                        </p>
                        <a
                            href="#connect"
                            style={{
                                display: 'inline-block',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'var(--c-black)',
                                backgroundColor: 'var(--c-yellow)',
                                border: '2px solid var(--c-black)',
                                boxShadow: '6px 6px 0 var(--c-black)',
                                padding: '0.75rem 1.75rem',
                                textDecoration: 'none',
                                marginBottom: '2.5rem',
                                transition: 'transform 0.1s, box-shadow 0.1s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--c-black)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '6px 6px 0 var(--c-black)'; }}
                        >
                            Write for Us →
                        </a>
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--c-white)', fontWeight: 700, alignItems: 'center' }}>
                            <span style={{ borderBottom: '2px solid var(--c-white)', paddingBottom: '4px' }}>EXPLORE</span>
                            <span style={{ color: 'var(--c-yellow)', fontSize: '1.2rem', paddingBottom: '4px' }}>•</span>
                            <span style={{ borderBottom: '2px solid var(--c-white)', paddingBottom: '4px' }}>READ</span>
                            <span style={{ color: 'var(--c-yellow)', fontSize: '1.2rem', paddingBottom: '4px' }}>•</span>
                            <span style={{ borderBottom: '2px solid var(--c-white)', paddingBottom: '4px' }}>CONNECT</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
