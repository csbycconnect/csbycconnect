import React, { useEffect, useRef, useState } from 'react';

export default function AnimateOnScroll({
    children,
    animationClass = 'animate-slide-up',
    delay = 0,
    threshold = 0.1,
    className = ''
}) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const cachedRef = elementRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold
            }
        );

        if (cachedRef) {
            observer.observe(cachedRef);
        }

        return () => {
            if (cachedRef) {
                observer.unobserve(cachedRef);
            }
        };
    }, [isVisible, threshold]);

    return (
        <div
            ref={elementRef}
            className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}
            style={{
                animationDelay: `${delay}s`,
                opacity: isVisible ? undefined : 0,
                // Initial state before intersection observer triggers
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </div>
    );
}
