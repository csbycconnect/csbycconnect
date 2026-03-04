import React from 'react';
import '../../styles/components.css';

export default function HeroArticle() {
    return (
        <div className="article-wrapper">
            <div className="article-shadow"></div>
            <article className="article-card">
                <img
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop"
                    alt="AI Brain"
                    className="article-image"
                />
                <h1 className="article-title">The Future of AI where Algorithms And in Higher Education</h1>
                <div className="article-meta">
                    <span>OCTOBER 28, 2024</span>
                    <span>CS-BYC ADMIN</span>
                    <span>8 MIN READ</span>
                </div>
                <a href="#" className="explore-btn">EXPLORE NOW</a>
            </article>
        </div>
    );
}
