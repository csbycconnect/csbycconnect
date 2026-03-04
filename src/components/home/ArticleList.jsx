import React from 'react';
import '../../styles/components.css';

export default function ArticleList() {
    const articles = [
        {
            id: 1,
            title: 'The Future of AI in Higher Education',
            date: 'OCTOBER 28, 2024',
            author: 'CS-BYC ADMIN',
            readTime: '8 MIN READ',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop'
        },
        {
            id: 2,
            title: 'The Future of Learning in Higher Education',
            date: 'OCTOBER 26, 2024',
            author: 'CS-BYC ADMIN',
            readTime: '8 MIN READ',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop'
        }
    ];

    return (
        <div className="right-column-stack">
            {articles.map((article) => (
                <div className="article-wrapper" key={article.id}>
                    <div className="article-shadow"></div>
                    <article className="article-card horizontal">
                        <img src={article.image} alt={article.title} className="article-image" />
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: 1 }}>
                            <h2 className="article-title">{article.title}</h2>
                            <div className="article-meta">
                                <span>{article.date}</span>
                                <span>{article.author}</span>
                                <span>{article.readTime}</span>
                            </div>
                            <a href="#" className="explore-btn">EXPLORE NOW</a>
                        </div>
                    </article>
                </div>
            ))}
        </div>
    );
}
