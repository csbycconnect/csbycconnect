import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const TEXT = 'Welcome to ByteBoard';

const ByteboardLoader = ({ onComplete }) => {
    const screenRef = useRef(null);
    const textRef = useRef(null);
    const cursorRef = useRef(null);

    useEffect(() => {
        const letters = textRef.current.querySelectorAll('.bb-letter');
        const cursor = cursorRef.current;
        const screen = screenRef.current;

        let frame;
        let charIdx = 0;
        const CHAR_DELAY = 80; // ms per character

        // ── Phase 1: Cursor blinks idle (before typing) ───────────────────
        const blinkAnim = anime({
            targets: cursor,
            opacity: [1, 0],
            duration: 450,
            easing: 'steps(1)',
            loop: true,
            direction: 'alternate',
        });

        // ── Phase 2: Typewriter ────────────────────────────────────────────
        const startTyping = () => {
            blinkAnim.pause();
            anime.set(cursor, { opacity: 1 }); // solid cursor during typing

            const type = () => {
                if (charIdx < letters.length) {
                    // Reveal letter + give it layout space
                    const el = letters[charIdx];
                    el.style.display = 'inline-block';
                    el.style.opacity = '1';
                    charIdx++;
                    frame = setTimeout(type, CHAR_DELAY);
                } else {
                    // Done typing — blink 3× then exit
                    anime({
                        targets: cursor,
                        opacity: [1, 0],
                        duration: 400,
                        easing: 'steps(1)',
                        loop: 3,
                        direction: 'alternate',
                        complete: runExit,
                    });
                }
            };
            type();
        };

        setTimeout(startTyping, 3 * 900); // 3 blink cycles before typing

        // ── Phase 3: Camera-zoom exit ──────────────────────────────────────
        const runExit = () => {
            // a) fade the text out (cursor stays)
            anime({ targets: textRef.current, opacity: 0, duration: 300, easing: 'easeInQuad' });

            // b) move cursor to viewport center
            const rect = cursor.getBoundingClientRect();
            const vpCX = window.innerWidth / 2;
            const vpCY = window.innerHeight / 2;
            const dx = vpCX - (rect.left + rect.width / 2);
            const dy = vpCY - (rect.top + rect.height / 2);

            anime({
                targets: cursor,
                translateX: dx,
                translateY: dy,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    // c) cursor expands to fill the screen
                    const sx = (window.innerWidth * 2.5) / cursor.offsetWidth;
                    const sy = (window.innerHeight * 2.5) / cursor.offsetHeight;

                    anime({
                        targets: cursor,
                        scaleX: sx,
                        scaleY: sy,
                        duration: 800,
                        easing: 'easeInExpo',
                        complete: () => {
                            // d) CAMERA ZOOM — scale the whole screen inward
                            //    while fading, punching through into the website
                            anime({
                                targets: screen,
                                scale: [1, 6],
                                opacity: [1, 0],
                                duration: 650,
                                easing: 'easeInCubic',
                                complete: onComplete,
                            });
                        },
                    });
                },
            });
        };

        return () => {
            clearTimeout(frame);
            blinkAnim.pause();
        };
    }, [onComplete]);

    return (
        <div ref={screenRef} style={styles.screen}>
            <div style={styles.row}>
                {/* Text — letters start with display:none so cursor starts at position 0 */}
                <span ref={textRef} style={styles.text}>
                    {TEXT.split('').map((ch, i) => (
                        <span
                            key={i}
                            className="bb-letter"
                            style={{
                                display: 'none',          // no layout space until typed
                                opacity: 0,
                                whiteSpace: ch === ' ' ? 'pre' : 'normal',
                            }}
                        >
                            {ch}
                        </span>
                    ))}
                </span>

                {/* Terminal underline cursor — baseline-aligned */}
                <div ref={cursorRef} style={styles.cursor} />
            </div>
        </div>
    );
};

const styles = {
    screen: {
        position: 'fixed',
        inset: 0,
        backgroundColor: '#030E21',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
        transformOrigin: 'center center', // zoom anchors to center
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end', // cursor sits at BOTTOM of text (baseline)
        gap: 0,
    },
    text: {
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '2.8rem',
        fontWeight: 700,
        color: '#FDF5E6',
        letterSpacing: '0.04em',
        display: 'inline-block',
        lineHeight: 1,
    },
    cursor: {
        display: 'inline-block',
        width: '30px',
        height: '8px',
        backgroundColor: '#F1D302',
        marginLeft: '4px',
        flexShrink: 0,
        transformOrigin: 'center center',
    },
};

export default ByteboardLoader;
