import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

// ─── Default Items ───────────────────────────────────────────────────────────
const DEFAULT_ITEMS = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'Blogs', href: '/blogs', isRoute: true },
    { label: 'About', href: '#about', isRoute: false },
    { label: 'Connect', href: '#connect', isRoute: false },
];

const DEFAULT_SOCIALS = [
    { label: 'GH', href: 'https://github.com' },
    { label: 'IG', href: 'https://instagram.com' },
    { label: 'LI', href: 'https://linkedin.com' },
];

// ─── StaggeredMenu ────────────────────────────────────────────────────────────
export default function StaggeredMenu({
    items = DEFAULT_ITEMS,
    socials = DEFAULT_SOCIALS,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const overlayRef = useRef(null);
    const itemsRef = useRef([]);
    const socialsRef = useRef([]);
    const bar1Ref = useRef(null);
    const bar2Ref = useRef(null);
    const bar3Ref = useRef(null);
    const tlRef = useRef(null);

    // Build GSAP timeline once
    useEffect(() => {
        const overlay = overlayRef.current;
        const menuItems = itemsRef.current;
        const socialItems = socialsRef.current;

        tlRef.current = gsap.timeline({ paused: true })
            // reveal overlay
            .set(overlay, { display: 'flex' })
            .fromTo(overlay,
                { clipPath: 'circle(0% at calc(100% - 3.5rem) 3.5rem)', opacity: 1 },
                { clipPath: 'circle(150% at calc(100% - 3.5rem) 3.5rem)', duration: 0.55, ease: 'power4.inOut' }
            )
            // stagger nav items
            .fromTo(menuItems,
                { y: 40, opacity: 0, skewY: 6 },
                { y: 0, opacity: 1, skewY: 0, stagger: 0.07, duration: 0.45, ease: 'power3.out' },
                '-=0.2'
            )
            // stagger social links
            .fromTo(socialItems,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: 'power2.out' },
                '-=0.2'
            );

        return () => {
            tlRef.current?.kill();
        };
    }, []);

    // Play / reverse timeline
    useEffect(() => {
        if (!tlRef.current) return;
        if (isOpen) {
            tlRef.current.play();
        } else {
            tlRef.current.reverse();
        }
    }, [isOpen]);

    // Animate hamburger bars
    useEffect(() => {
        if (isOpen) {
            gsap.to(bar1Ref.current, { rotation: 45, y: 8, duration: 0.3, ease: 'power2.inOut' });
            gsap.to(bar2Ref.current, { opacity: 0, duration: 0.2 });
            gsap.to(bar3Ref.current, { rotation: -45, y: -8, duration: 0.3, ease: 'power2.inOut' });
        } else {
            gsap.to(bar1Ref.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
            gsap.to(bar2Ref.current, { opacity: 1, duration: 0.2, delay: 0.1 });
            gsap.to(bar3Ref.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
        }
    }, [isOpen]);

    const handleClose = () => setIsOpen(false);

    return (
        <>
            {/* ── Hamburger Button ── */}
            <button
                onClick={() => setIsOpen(o => !o)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    zIndex: 200,
                    width: '48px',
                    height: '48px',
                    background: 'var(--c-yellow)',
                    border: '2px solid var(--c-black)',
                    boxShadow: '4px 4px 0 var(--c-black)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    padding: 0,
                }}
            >
                <span ref={bar1Ref} style={barStyle} />
                <span ref={bar2Ref} style={barStyle} />
                <span ref={bar3Ref} style={barStyle} />
            </button>

            {/* ── Full-screen overlay ── */}
            <div
                ref={overlayRef}
                style={{
                    display: 'none',           // toggled by GSAP
                    position: 'fixed',
                    inset: 0,
                    zIndex: 150,
                    background: 'var(--c-dark-blue)',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: 'clamp(2rem, 6vw, 5rem)',
                    borderLeft: '6px solid var(--c-yellow)',
                    overflow: 'hidden',
                }}
            >
                {/* Close hit-area for background click */}
                <div
                    onClick={handleClose}
                    style={{ position: 'absolute', inset: 0, zIndex: 0 }}
                />

                {/* ── Nav items ── */}
                <nav style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {items.map((item, i) => (
                            <li
                                key={item.label}
                                ref={el => (itemsRef.current[i] = el)}
                                style={{ overflow: 'hidden', marginBottom: 'clamp(0.5rem, 2vh, 1.2rem)' }}
                            >
                                {item.isRoute ? (
                                    <Link
                                        to={item.href}
                                        onClick={handleClose}
                                        style={navLinkStyle}
                                        onMouseEnter={e => gsap.to(e.currentTarget, { x: 12, color: 'var(--c-yellow)', duration: 0.2 })}
                                        onMouseLeave={e => gsap.to(e.currentTarget, { x: 0, color: 'var(--c-white)', duration: 0.2 })}
                                    >
                                        <span style={navNumStyle}>0{i + 1}</span>
                                        {item.label}
                                        <span style={navArrowStyle}>→</span>
                                    </Link>
                                ) : (
                                    <a
                                        href={item.href}
                                        onClick={handleClose}
                                        style={navLinkStyle}
                                        onMouseEnter={e => gsap.to(e.currentTarget, { x: 12, color: 'var(--c-yellow)', duration: 0.2 })}
                                        onMouseLeave={e => gsap.to(e.currentTarget, { x: 0, color: 'var(--c-white)', duration: 0.2 })}
                                    >
                                        <span style={navNumStyle}>0{i + 1}</span>
                                        {item.label}
                                        <span style={navArrowStyle}>→</span>
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ── Divider ── */}
                <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.15)', margin: '1.5rem 0', position: 'relative', zIndex: 1 }} />

                {/* ── Social links ── */}
                <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                    {socials.map((s, i) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            ref={el => (socialsRef.current[i] = el)}
                            style={socialStyle}
                            onMouseEnter={e => gsap.to(e.currentTarget, { y: -4, boxShadow: '4px 4px 0 var(--c-yellow)', duration: 0.2 })}
                            onMouseLeave={e => gsap.to(e.currentTarget, { y: 0, boxShadow: '2px 2px 0 var(--c-black)', duration: 0.2 })}
                        >
                            {s.label}
                        </a>
                    ))}
                </div>

                {/* ── Corner decoration ── */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    right: '2rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.25)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    zIndex: 1,
                }}>
                    ByteBoard © 2025
                </div>
            </div>
        </>
    );
}

// ─── Shared micro-styles ──────────────────────────────────────────────────────
const barStyle = {
    display: 'block',
    width: '22px',
    height: '2px',
    background: 'var(--c-black)',
    borderRadius: '1px',
    transformOrigin: 'center',
};

const navLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: 700,
    color: 'var(--c-white)',
    textDecoration: 'none',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    cursor: 'pointer',
    transition: 'none', // GSAP handles transitions
};

const navNumStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
    color: 'var(--c-yellow)',
    marginRight: '0.25rem',
    alignSelf: 'flex-start',
    paddingTop: '0.5em',
};

const navArrowStyle = {
    marginLeft: 'auto',
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
    opacity: 0.4,
};

const socialStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--c-white)',
    textDecoration: 'none',
    border: '2px solid rgba(255,255,255,0.4)',
    padding: '0.5rem 1rem',
    boxShadow: '2px 2px 0 var(--c-black)',
    background: 'transparent',
};
