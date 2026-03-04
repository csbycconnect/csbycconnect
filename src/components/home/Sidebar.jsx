import React from 'react';
import '../../styles/components.css';

export default function Sidebar() {
    const quickLinks = [
        { name: 'ABOUT', href: '#about' },
        { name: 'FEATURED', href: '#featured' },
        { name: 'FAQ', href: '#faq' },
        { name: 'CONNECT', href: '#connect' }
    ];

    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-shadow"></div>
            <aside className="sidebar">
                <h2>Quick Access</h2>
                <div className="filter-list">
                    {quickLinks.map(link => (
                        <a key={link.name} href={link.href} className="filter-item" style={{ textDecoration: 'none' }}>
                            {link.name}
                        </a>
                    ))}
                </div>
            </aside>
        </div>
    );
}
