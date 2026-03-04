import React from 'react';

export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="brutal-modal-overlay" onClick={onClose}>
            <div className="brutal-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
}
