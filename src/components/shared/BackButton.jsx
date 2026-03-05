import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <button
            onClick={handleBack}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--c-white)',
                background: 'transparent',
                border: '2px solid rgba(255,255,255,0.25)',
                padding: '0.4rem 0.85rem',
                cursor: 'pointer',
                marginBottom: '1.5rem',
                marginTop: '1.25rem',
                transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--c-yellow)';
                e.currentTarget.style.color = 'var(--c-yellow)';
                e.currentTarget.style.boxShadow = '3px 3px 0 var(--c-yellow)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                e.currentTarget.style.color = 'var(--c-white)';
                e.currentTarget.style.boxShadow = 'none';
            }}
            aria-label="Go back"
        >
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>←</span>
            Back
        </button>
    );
}
