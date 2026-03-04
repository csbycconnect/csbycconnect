import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

// ─── EVENTS ────────────────────────────────────────────────────────────────────
// Keyed by "YYYY-MM-DD". All relevant to 2026 so they fall in the current view.
const EVENTS = {
    '2026-03-05': {
        title: 'ByteBoard Editorial Meet',
        tag: 'ByteBoard', tagColor: '#f7d000',
        time: '4:00 PM – 5:30 PM',
        venue: 'Room 102, CS Block',
        desc: 'Monthly editorial board meeting to review article submissions and plan the next issue. All writers and editors expected to attend.',
    },
    '2026-03-08': {
        title: 'International Women\'s Day — Tech Panel',
        tag: 'CS Dept', tagColor: '#0A192F',
        time: '10:00 AM – 12:00 PM',
        venue: 'Seminar Hall B',
        desc: 'Panel discussion featuring women leaders in technology. Open to all students. Registration required via the CS Department portal.',
    },
    '2026-03-15': {
        title: 'Hackathon 2026 — Registration Deadline',
        tag: 'CS Dept', tagColor: '#0A192F',
        time: 'All Day',
        venue: 'Online',
        desc: 'Last day to register teams for the annual 24-hour Hackathon. Teams of 2–4 members. Problem statements will be revealed at the event.',
    },
    '2026-03-20': {
        title: 'React Deep Dive Workshop',
        tag: 'CS Dept', tagColor: '#0A192F',
        time: '2:00 PM – 5:00 PM',
        venue: 'Lab 3, CS Block',
        desc: 'Hands-on workshop covering React hooks, context API, and performance optimisation. Bring your laptops. Prerequisites: basic JavaScript.',
    },
    '2026-03-22': {
        title: 'Guest Lecture: AI Ethics',
        tag: 'CS Dept', tagColor: '#0A192F',
        time: '11:00 AM – 12:30 PM',
        venue: 'Auditorium',
        desc: 'Prof. Ananya Iyer from IISc Bengaluru speaks on ethical considerations in modern AI systems — bias, fairness, and accountability.',
    },
    '2026-03-28': {
        title: 'Hackathon 2026',
        tag: 'CS Dept', tagColor: '#0A192F',
        time: '9:00 AM (24 hrs)',
        venue: 'CS Block — All Labs',
        desc: '24-hour coding marathon. Themes: Healthcare Tech, FinTech, and Sustainability. Prizes worth ₹50,000. Meals and refreshments provided.',
    },
    '2026-04-02': {
        title: 'ByteBoard Article Submissions Open',
        tag: 'ByteBoard', tagColor: '#f7d000',
        time: 'All Day',
        venue: 'Online (byteboard.csbyc.in)',
        desc: 'The submission window for the April edition opens today. Accepted categories: Technical, Opinion, Research Review, and Career. Deadline: April 10.',
    },
    '2026-04-05': {
        title: 'ByteBoard Pitch Session',
        tag: 'ByteBoard', tagColor: '#f7d000',
        time: '3:30 PM – 5:00 PM',
        venue: 'Seminar Hall A',
        desc: 'Writers pitch their article ideas to the editorial board. New contributors especially welcome. Shortlisted pitches move to the writing phase.',
    },
    '2026-04-10': {
        title: 'Article Submission Deadline',
        tag: 'ByteBoard', tagColor: '#f7d000',
        time: '11:59 PM',
        venue: 'Online',
        desc: 'Hard deadline for April edition article submissions. Late submissions will be considered for May edition only.',
    },
    '2026-04-12': {
        title: 'Web Dev Workshop — Part II',
        tag: 'CS Dept', tagColor: '#0A192F',
        time: '2:00 PM – 5:00 PM',
        venue: 'Lab 2, CS Block',
        desc: 'Continuation of the Web Dev workshop series. Topics: REST APIs, authentication with JWT, and deploying to Vercel. Attendance from Part I preferred.',
    },
    '2026-04-18': {
        title: 'Department Day 2026',
        tag: 'CS Dept', tagColor: '#0A192F',
        time: '9:00 AM – 6:00 PM',
        venue: 'CS Block & Open Grounds',
        desc: 'Annual CS Department Day featuring project expo, cultural performances, alumni talks, and the ByteBoard magazine launch. All are welcome.',
    },
    '2026-04-25': {
        title: 'End Semester Exams Begin',
        tag: 'Academic', tagColor: '#333',
        time: 'As per timetable',
        venue: 'Exam Halls',
        desc: 'End semester examinations commence. Check the academic calendar for your specific subject schedule. All club activities are suspended during the exam period.',
    },
    '2026-05-10': {
        title: 'Results Day',
        tag: 'Academic', tagColor: '#333',
        time: '10:00 AM onwards',
        venue: 'Online (exam portal)',
        desc: 'Semester results declared. Log in to the student portal to view grades and marksheets. Revaluation requests accepted within 7 days.',
    },
};

function getDaysInMonth(year, month) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(year, month) { return new Date(year, month, 1).getDay(); }

const navBtnStyle = {
    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    backgroundColor: 'transparent', color: 'var(--c-black)',
    border: '2px solid var(--c-black)', boxShadow: '3px 3px 0 var(--c-black)',
    padding: '0.4rem 0.9rem', cursor: 'pointer',
};

export default function Calendar() {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selected, setSelected] = useState(null);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    const prevMonth = () => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); } else { setViewMonth(m => m - 1); } setSelected(null); };
    const nextMonth = () => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); } else { setViewMonth(m => m + 1); } setSelected(null); };

    const pad = n => String(n).padStart(2, '0');
    const dateKey = (d) => `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
    const isToday = (d) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

    const selectedEvent = selected ? EVENTS[dateKey(selected)] : null;

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
                        {/* Brutalist shadow */}
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
                                    if (!day) return <div key={`e-${i}`} />;
                                    const key = dateKey(day);
                                    const hasEvent = !!EVENTS[key];
                                    const event = EVENTS[key];
                                    const isSelected = selected === day;
                                    const todayDay = isToday(day);

                                    return (
                                        <div
                                            key={key}
                                            onClick={() => hasEvent && setSelected(isSelected ? null : day)}
                                            title={hasEvent ? event.title : undefined}
                                            style={{
                                                aspectRatio: '1',
                                                display: 'flex', flexDirection: 'column',
                                                alignItems: 'center', justifyContent: 'center',
                                                fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
                                                fontWeight: todayDay ? 700 : 400,
                                                border: isSelected ? '2px solid var(--c-black)' : todayDay ? '2px solid var(--c-black)' : '2px solid transparent',
                                                backgroundColor: isSelected ? 'var(--c-black)' : todayDay ? 'var(--c-yellow)' : hasEvent ? '#f5f0e8' : 'transparent',
                                                color: isSelected ? '#fff' : 'var(--c-black)',
                                                cursor: hasEvent ? 'pointer' : 'default',
                                                boxShadow: isSelected ? '3px 3px 0 var(--c-yellow)' : todayDay ? '3px 3px 0 var(--c-black)' : 'none',
                                                transition: 'all 0.15s',
                                                position: 'relative',
                                            }}
                                        >
                                            {day}
                                            {hasEvent && (
                                                <span style={{
                                                    width: 5, height: 5, borderRadius: '50%',
                                                    backgroundColor: isSelected ? '#f7d000' : event.tagColor || 'var(--c-black)',
                                                    position: 'absolute', bottom: 4,
                                                }} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Selected day event panel */}
                            {selected && (
                                <div style={{
                                    marginTop: '1.5rem', borderTop: '2px solid var(--c-black)', paddingTop: '1.25rem',
                                    transition: 'all 0.2s',
                                }}>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem', letterSpacing: '0.08em' }}>
                                        {MONTH_NAMES[viewMonth]} {selected}, {viewYear}
                                    </p>
                                    {selectedEvent ? (
                                        <div style={{ border: '2px solid #000', boxShadow: '5px 5px 0 ' + (selectedEvent.tagColor || '#000') }}>
                                            {/* Event header */}
                                            <div style={{ background: selectedEvent.tagColor || '#0A192F', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                                <div>
                                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: selectedEvent.tagColor === '#f7d000' ? '#000' : 'rgba(255,255,255,0.6)', marginBottom: 2 }}>
                                                        {selectedEvent.tag}
                                                    </div>
                                                    <div style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '1.2rem', fontWeight: 700, color: selectedEvent.tagColor === '#f7d000' ? '#000' : '#fff', lineHeight: 1.2 }}>
                                                        {selectedEvent.title}
                                                    </div>
                                                </div>
                                                <button onClick={() => setSelected(null)} style={{ background: 'none', border: '1.5px solid rgba(255,255,255,0.4)', color: selectedEvent.tagColor === '#f7d000' ? '#000' : '#fff', cursor: 'pointer', padding: '0.2rem 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', flexShrink: 0 }}>✕</button>
                                            </div>
                                            {/* Event body */}
                                            <div style={{ background: '#fff', padding: '1.25rem' }}>
                                                <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                                    <div>
                                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', color: '#999', letterSpacing: '0.1em', marginBottom: 2 }}>🕐 Time</div>
                                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#000', fontWeight: 700 }}>{selectedEvent.time}</div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', color: '#999', letterSpacing: '0.1em', marginBottom: 2 }}>📍 Venue</div>
                                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#000', fontWeight: 700 }}>{selectedEvent.venue}</div>
                                                    </div>
                                                </div>
                                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#444', lineHeight: 1.6, borderTop: '1px solid #eee', paddingTop: '0.75rem' }}>
                                                    {selectedEvent.desc}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#aaa', padding: '1rem', border: '1.5px dashed #ddd' }}>
                                            No events scheduled for this day.
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Legend */}
                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#777', borderTop: '1px solid #ddd', paddingTop: '1rem', flexWrap: 'wrap' }}>
                                <span><span style={{ display: 'inline-block', width: 12, height: 12, backgroundColor: 'var(--c-yellow)', border: '2px solid #000', marginRight: 4, verticalAlign: 'middle' }} />Today</span>
                                <span><span style={{ display: 'inline-block', width: 12, height: 12, backgroundColor: '#f5f0e8', border: '1px solid #ccc', marginRight: 4, verticalAlign: 'middle' }} />Has Event <span style={{ color: '#bbb' }}>(click to view)</span></span>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#f7d000', border: '1px solid #000', marginRight: 4, verticalAlign: 'middle' }} />ByteBoard</span>
                                    <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#0A192F', marginRight: 4, verticalAlign: 'middle' }} />CS Dept</span>
                                    <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#333', marginRight: 4, verticalAlign: 'middle' }} />Academic</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>
            </main>
            <Footer />
        </div>
    );
}
