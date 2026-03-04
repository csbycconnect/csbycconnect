import React from 'react';
import Particles from '../shared/Particles';

/**
 * GlobalBackground — fixed, full-viewport Particles canvas.
 *
 * Sits behind all content (z-index: 0, pointer-events: none).
 * Uses the site's yellow + white palette on the dark-blue base.
 *
 * moveParticlesOnHover is OFF because the wrapper has pointer-events:none;
 * the particles still drift and rotate continuously which looks great as
 * a passive background.
 */
export default function GlobalBackground() {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                backgroundColor: '#0A192F',   // site's --c-dark-blue
            }}
            aria-hidden="true"
        >
            <Particles
                // Palette — yellow accent + soft warm white (site's --c-white)
                particleColors={['#f7d000', '#fff9db', '#ffffff']}

                // Volume
                particleCount={200}
                particleSpread={10}

                // Motion
                speed={0.1}
                disableRotation={false}

                // Appearance
                particleBaseSize={80}
                sizeRandomness={1}
                alphaParticles={false}

                // Depth / camera
                cameraDistance={20}
                pixelRatio={1}

                // Hover interaction disabled — canvas has pointer-events: none
                moveParticlesOnHover={false}
            />
        </div>
    );
}
