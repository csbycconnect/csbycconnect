import React from 'react';

export default function FeaturedBlogs() {
    const blogs = [
        { id: 1, title: 'The Rise of AI on Campus', date: 'Oct 12', excerpt: 'How students are exploring Large Language Models and their integration into upcoming hackathons.' },
        { id: 2, title: 'Hackathon Highlights', date: 'Sep 28', excerpt: 'A detailed recap of the most intense coding marathon of the academic year, featuring top projects.' },
        { id: 3, title: 'Demystifying Web3', date: 'Sep 15', excerpt: 'Understanding the decentralized web stack from a student perspective, minus the hype.' }
    ];

    return (
        <section id="featured">
            <h2 className="section-title">Featured Content</h2>
            <div className="blog-grid">
                {blogs.map(blog => (
                    <div key={blog.id} className="blog-card">
                        <span className="blog-date">{blog.date}</span>
                        <h3 className="blog-title">{blog.title}</h3>
                        <p className="blog-excerpt">{blog.excerpt}</p>
                        <a href="#" className="read-more">Read Article</a>
                    </div>
                ))}
            </div>
        </section>
    );
}
