import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';
import ShuffleText from '../components/shared/ShuffleText';

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
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2.5rem 5rem' }}>

                {/* Page Header */}
                <AnimateOnScroll animationClass="animate-slide-up" delay={0.1} threshold={0.05}>
                    <div style={{ marginBottom: '3rem', borderBottom: '2px solid var(--c-white)', paddingBottom: '1rem' }}>
                        <h1 className="serif-heading" style={{ color: 'var(--c-white)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
                            Events<span style={{ color: 'var(--c-yellow)' }}>.</span>
                        </h1>
                        <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                            Upcoming happenings from the CS Department — workshops, competitions, and more.
                        </p>
                    </div>
                </AnimateOnScroll>

                {/* Events Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                    {events.map((event, i) => {
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
            </main>
            <Footer />
        </div>
    );
}
