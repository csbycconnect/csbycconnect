import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

// Sample events keyed by "YYYY-MM-DD"
const EVENT_DATES = {
    '2026-03-15': 'Hackathon 2025',
    '2026-03-22': 'Guest Lecture: AI Ethics',
    '2026-04-05': 'ByteBoard Pitch Session',
    '2026-04-12': 'Web Dev Workshop',
};

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

export default function Calendar() {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selected, setSelected] = useState(null);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const cells = Array(firstDay).fill(null).concat(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else { setViewMonth(m => m - 1); }
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else { setViewMonth(m => m + 1); }
    };

    const pad = n => String(n).padStart(2, '0');
    const dateKey = (d) => `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
    const isToday = (d) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

    const selectedEvent = selected ? EVENT_DATES[dateKey(selected)] : null;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2.5rem 5rem' }}>

                <AnimateOnScroll animationClass="animate-slide-up" delay={0.1} threshold={0.05}>
                    <div style={{ marginBottom: '3rem', borderBottom: '2px solid var(--c-white)', paddingBottom: '1rem' }}>
                        <h1 className="serif-heading" style={{ color: 'var(--c-white)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
                            Calendar<span style={{ color: 'var(--c-yellow)' }}>.</span>
                        </h1>
                        <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                            Track important dates, events, and deadlines for the CS Department.
                        </p>
                    </div>
                </AnimateOnScroll>

                <AnimateOnScroll animationClass="animate-slide-up" delay={0.15} threshold={0.05}>
                    <div style={{ position: 'relative' }}>
                        {/* shadow */}
                        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '100%', height: '100%', border: '2px solid var(--c-yellow)', zIndex: 0 }} />
                        <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--c-white)', border: '2px solid var(--c-black)', padding: '2rem' }}>

                            {/* Month Nav */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid var(--c-black)', paddingBottom: '1rem' }}>
                                <button onClick={prevMonth} style={navBtnStyle}>← Prev</button>
                                <h2 className="serif-heading" style={{ fontSize: '1.8rem', color: 'var(--c-black)' }}>
                                    {MONTH_NAMES[viewMonth]} {viewYear}
                                </h2>
                                <button onClick={nextMonth} style={navBtnStyle}>Next →</button>
                            </div>

                            {/* Day headers */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
                                {DAYS.map(d => (
                                    <div key={d} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center', padding: '0.4rem 0', color: '#555', letterSpacing: '0.1em' }}>{d}</div>
                                ))}
                            </div>

                            {/* Calendar grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                                {cells.map((day, i) => {
                                    if (!day) return <div key={`empty-${i}`} />;
                                    const key = dateKey(day);
                                    const hasEvent = !!EVENT_DATES[key];
                                    const isSelected = selected === day;
                                    const todayDay = isToday(day);

                                    return (
                                        <div
                                            key={key}
                                            onClick={() => setSelected(isSelected ? null : day)}
                                            style={{
                                                aspectRatio: '1',
                                                display: 'flex', flexDirection: 'column',
                                                alignItems: 'center', justifyContent: 'center',
                                                fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: todayDay ? 700 : 400,
                                                border: isSelected ? '2px solid var(--c-black)' : todayDay ? '2px solid var(--c-black)' : '2px solid transparent',
                                                backgroundColor: isSelected ? 'var(--c-black)' : todayDay ? 'var(--c-yellow)' : hasEvent ? '#f0f0f0' : 'transparent',
                                                color: isSelected ? '#fff' : 'var(--c-black)',
                                                cursor: hasEvent ? 'pointer' : 'default',
                                                boxShadow: isSelected ? '3px 3px 0 var(--c-yellow)' : todayDay ? '3px 3px 0 var(--c-black)' : 'none',
                                                transition: 'all 0.15s',
                                                position: 'relative',
                                                borderRadius: 0,
                                            }}
                                        >
                                            {day}
                                            {hasEvent && (
                                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: isSelected ? 'var(--c-yellow)' : 'var(--c-black)', position: 'absolute', bottom: '4px' }} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Selected day event */}
                            {selected && (
                                <div style={{ marginTop: '1.5rem', borderTop: '2px solid var(--c-black)', paddingTop: '1rem' }}>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#555', marginBottom: '0.4rem' }}>
                                        {MONTH_NAMES[viewMonth]} {selected}, {viewYear}
                                    </p>
                                    {selectedEvent ? (
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--c-black)', fontWeight: 700 }}>
                                            📌 {selectedEvent}
                                        </p>
                                    ) : (
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#888' }}>
                                            No events scheduled for this day.
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Legend */}
                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                                <span><span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: 'var(--c-yellow)', border: '2px solid #000', marginRight: '4px', verticalAlign: 'middle' }} />Today</span>
                                <span><span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: '#f0f0f0', border: '2px solid transparent', marginRight: '4px', verticalAlign: 'middle' }} />Has Event</span>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>
            </main>
            <Footer />
        </div>
    );
}

const navBtnStyle = {
    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    backgroundColor: 'transparent', color: 'var(--c-black)',
    border: '2px solid var(--c-black)', boxShadow: '3px 3px 0 var(--c-black)',
    padding: '0.4rem 0.9rem', cursor: 'pointer',
};
