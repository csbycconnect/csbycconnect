import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';
import ShuffleText from '../components/shared/ShuffleText';
import BackButton from '../components/shared/BackButton';

const events = [
    {
        id: 1,
        title: 'Hackathon 2025 — Build the Future',
        date: 'March 15, 2025',
        time: '9:00 AM – 9:00 PM',
        venue: 'CS Dept, Block A, CHRIST YP',
        category: 'Competition',
        description: 'A 12-hour hackathon open to all CS students. Build anything that solves a real problem. Solo or teams of up to 4.',
    },
    {
        id: 2,
        title: 'Guest Lecture: Ethics in AI',
        date: 'March 22, 2025',
        time: '2:00 PM – 4:00 PM',
        venue: 'Seminar Hall, Block B',
        category: 'Lecture',
        description: 'Industry expert panel discussing the ethical implications of modern AI systems, bias, and accountability.',
    },
    {
        id: 3,
        title: 'ByteBoard Pitch Session',
        date: 'April 5, 2025',
        time: '11:00 AM – 1:00 PM',
        venue: 'CS Lab 3, Block A',
        category: 'Editorial',
        description: 'Open pitch session for students who want to write for ByteBoard. Bring your ideas — no commitment required.',
    },
    {
        id: 4,
        title: 'Web Dev Workshop: React Deep Dive',
        date: 'April 12, 2025',
        time: '10:00 AM – 1:00 PM',
        venue: 'CS Lab 1, Block A',
        category: 'Workshop',
        description: 'Hands-on workshop covering React hooks, state management, and building production-ready UIs.',
    },
];

const categoryColors = {
    Competition: { bg: '#f7d000', text: '#000' },
    Lecture: { bg: '#fff9db', text: '#000' },
    Editorial: { bg: '#0A192F', text: '#fff' },
    Workshop: { bg: '#000', text: '#fff' },
};

export default function Events() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const filtered = events.filter(ev => {
        const q = searchQuery.toLowerCase();
        return (
            ev.title.toLowerCase().includes(q) ||
            ev.description.toLowerCase().includes(q) ||
            ev.category.toLowerCase().includes(q) ||
            ev.venue.toLowerCase().includes(q)
        );
    });

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2.5rem 5rem' }}>
                <BackButton />

                {/* Page Header */}
                <AnimateOnScroll animationClass="animate-slide-up" delay={0.1} threshold={0.05}>
                    <div style={{ marginBottom: '2rem', borderBottom: '2px solid var(--c-white)', paddingBottom: '1rem' }}>
                        <h1 className="serif-heading" style={{ color: 'var(--c-white)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
                            Events<span style={{ color: 'var(--c-yellow)' }}>.</span>
                        </h1>
                        <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                            Upcoming happenings from the CS Department — workshops, competitions, and more.
                        </p>
                    </div>
                </AnimateOnScroll>

                {/* Search Bar */}
                <AnimateOnScroll animationClass="animate-slide-up" delay={0.15} threshold={0.05}>
                    <div style={{ marginBottom: '2.5rem', position: 'relative' }}>
                        <div style={{
                            position: 'relative',
                            display: 'inline-flex',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '480px',
                        }}>
                            {/* Search icon */}
                            <span style={{
                                position: 'absolute',
                                left: '0.85rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.9rem',
                                color: isFocused ? 'var(--c-yellow)' : 'rgba(255,255,255,0.4)',
                                pointerEvents: 'none',
                                transition: 'color 0.15s',
                                userSelect: 'none',
                            }}>⌕</span>
                            <input
                                type="text"
                                placeholder="Search events…"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                style={{
                                    width: '100%',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.85rem',
                                    color: 'var(--c-white)',
                                    background: 'transparent',
                                    border: `2px solid ${isFocused ? 'var(--c-yellow)' : 'rgba(255,255,255,0.3)'}`,
                                    outline: 'none',
                                    padding: '0.65rem 2.5rem 0.65rem 2.35rem',
                                    boxShadow: isFocused ? '4px 4px 0 var(--c-yellow)' : 'none',
                                    transition: 'border-color 0.15s, box-shadow 0.15s',
                                }}
                            />
                            {/* Clear button */}
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    style={{
                                        position: 'absolute',
                                        right: '0.65rem',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: '1rem',
                                        lineHeight: 1,
                                        padding: '0',
                                    }}
                                    aria-label="Clear search"
                                >×</button>
                            )}
                        </div>
                        {searchQuery && (
                            <p style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                color: 'rgba(255,255,255,0.4)',
                                marginTop: '0.5rem',
                            }}>
                                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchQuery}"
                            </p>
                        )}
                    </div>
                </AnimateOnScroll>

                {/* Events Grid */}
                {filtered.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                        {filtered.map((event, i) => {
                            const cat = categoryColors[event.category] || { bg: '#eee', text: '#000' };
                            return (
                                <AnimateOnScroll key={event.id} animationClass="animate-slide-up" delay={0.1 * i} threshold={0.05}>
                                    <div style={{ position: 'relative' }}>
                                        {/* shadow block */}
                                        <div style={{ position: 'absolute', top: '8px', left: '8px', width: '100%', height: '100%', border: '2px solid var(--c-yellow)', zIndex: 0 }} />
                                        {/* card */}
                                        <div style={{
                                            position: 'relative', zIndex: 1,
                                            backgroundColor: 'var(--c-white)',
                                            border: '2px solid var(--c-black)',
                                            padding: '2rem',
                                            display: 'flex', flexDirection: 'column', gap: '1rem',
                                        }}>
                                            {/* Category pill */}
                                            <span style={{
                                                alignSelf: 'flex-start',
                                                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700,
                                                textTransform: 'uppercase', letterSpacing: '0.1em',
                                                backgroundColor: cat.bg, color: cat.text,
                                                border: '2px solid var(--c-black)',
                                                padding: '0.2rem 0.6rem',
                                            }}>
                                                {event.category}
                                            </span>

                                            <h2 className="serif-heading" style={{ fontSize: '1.4rem', lineHeight: 1.2, color: 'var(--c-black)' }}>
                                                {event.title}
                                            </h2>

                                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#333', lineHeight: 1.6 }}>
                                                {event.description}
                                            </p>

                                            {/* Meta */}
                                            <div style={{ borderTop: '2px solid var(--c-black)', paddingTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#555', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                                <span>📅 {event.date} · {event.time}</span>
                                                <span>📍 {event.venue}</span>
                                            </div>

                                            <button style={{
                                                alignSelf: 'flex-start', marginTop: 'auto',
                                                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem',
                                                textTransform: 'uppercase', letterSpacing: '0.05em',
                                                backgroundColor: 'var(--c-black)', color: 'var(--c-white)',
                                                border: '2px solid var(--c-black)', boxShadow: '4px 4px 0 var(--c-yellow)',
                                                padding: '0.6rem 1.25rem', cursor: 'pointer',
                                            }}>
                                                <ShuffleText text="Learn More →" />
                                            </button>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        border: '2px dashed rgba(255,255,255,0.2)',
                    }}>
                        <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                            No events found.
                        </p>
                        <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
                            Try a different search term.
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
