import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * ShuffleText — drop-in text animation component.
 *
 * Splits `text` into individual character spans. On the nearest
 * button/anchor's mouseenter, odd and even characters shuffle out
 * upward then snap back from below — the same staggered even/odd
 * pattern from the reactbits.dev Shuffle component, adapted for
 * ByteBoard's own fonts and brutalist aesthetic.
 *
 * Usage:
 *   <a href="..." className="explore-btn">
 *     <ShuffleText text="Read More →" />
 *   </a>
 *
 * Notes:
 * - No font is imposed; inherits parent's font.
 * - Works with any tag: <button>, <a>, React Router <Link>.
 * - Uses only gsap (no premium SplitText plugin).
 */
export default function ShuffleText({ text }) {
    const ref = useRef(null);
    const tlRef = useRef(null);

    const animate = useCallback(() => {
        const el = ref.current;
        if (!el) return;

        // Kill any in-progress animation on rapid hover
        if (tlRef.current) tlRef.current.kill();

        const chars = [...el.querySelectorAll('.sft-c')];
        if (!chars.length) return;

        const odd = chars.filter((_, i) => i % 2 === 1);
        const even = chars.filter((_, i) => i % 2 === 0);

        const tl = gsap.timeline({ defaults: { force3D: true } });

        // Odd chars: fly up, snap below, slide in
        if (odd.length) {
            tl.to(odd, { yPercent: -120, duration: 0.16, stagger: 0.022, ease: 'power2.in' }, 0)
                .set(odd, { yPercent: 120 })
                .to(odd, { yPercent: 0, duration: 0.28, stagger: 0.022, ease: 'power3.out' }, '-=0.05');
        }

        // Even chars: 55ms offset so groups interleave visually
        if (even.length) {
            tl.to(even, { yPercent: -120, duration: 0.16, stagger: 0.022, ease: 'power2.in' }, 0.055)
                .set(even, { yPercent: 120 })
                .to(even, { yPercent: 0, duration: 0.28, stagger: 0.022, ease: 'power3.out' }, '-=0.05');
        }

        tlRef.current = tl;
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Walk up the DOM to find the nearest interactive parent
        const parent = el.closest('button, a, [role="button"]');
        if (!parent) return;

        parent.addEventListener('mouseenter', animate);
        return () => parent.removeEventListener('mouseenter', animate);
    }, [animate]);

    return (
        <span
            ref={ref}
            style={{ display: 'inline-flex', flexWrap: 'nowrap', alignItems: 'center' }}
            aria-hidden={false}
        >
            {[...text].map((ch, i) => (
                <span
                    key={i}
                    style={{
                        display: 'inline-block',
                        overflow: 'hidden',
                        verticalAlign: 'bottom',
                        // Height must contain the character; 1.2em is safe for
                        // uppercase mono/serif — adjust if descenders clip.
                        height: '1.2em',
                        lineHeight: 'inherit',
                    }}
                >
                    {/* Inner span is what GSAP animates (yPercent) */}
                    <span
                        className="sft-c"
                        style={{ display: 'block', lineHeight: 'inherit', willChange: 'transform' }}
                    >
                        {ch === ' ' ? '\u00a0' : ch}
                    </span>
                </span>
            ))}
        </span>
    );
}
