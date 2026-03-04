import React, { useState, useMemo } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedList from '../components/blog/AnimatedList';

const ALL_POSTS = [
    {
        id: 1,
        author: 'CS-BYC Admin',
        date: 'Jul 30, 2025',
        readTime: '8 min read',
        title: 'Multimodal exploration for scientific discovery - Shorya Rawal 2241347',
        excerpt: 'Multimodal exploration for scientific discovery Introduction Modern science is no longer confined to isolated experiments or...',
        views: 6,
        comments: 0,
        category: 'AI / ML',
        avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Admin1&backgroundColor=0d2142&textColor=ffffff'
    },
    {
        id: 2,
        author: 'CS-BYC Admin',
        date: 'Jul 30, 2025',
        readTime: '6 min read',
        title: "Does My Phone Listen to Me? Here's the Unsettling Truth - Shambhavi Sinha 2241366",
        excerpt: "Does My Phone Listen to Me? Here's the Unsettling Truth Imagine you are sitting and chatting with your friends, a casual chat, maybe...",
        views: 4,
        comments: 1,
        category: 'Cybersecurity',
        avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Admin2&backgroundColor=0d2142&textColor=ffffff'
    },
    {
        id: 3,
        author: 'CS-BYC Admin',
        date: 'Jul 29, 2025',
        readTime: '5 min read',
        title: "The Future of Quantum Computing - Alex Chen 2241312",
        excerpt: "Quantum supremacy has finally been achieved. What does this mean for the future of cryptography and scientific simulation? Allow me to expla...",
        views: 12,
        comments: 3,
        category: 'Tech Trends',
        avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Admin3&backgroundColor=0d2142&textColor=ffffff'
    }
];

const READ_TIME_RANGES = [
    { label: '< 5 min', fn: rt => parseInt(rt) < 5 },
    { label: '5–8 min', fn: rt => parseInt(rt) >= 5 && parseInt(rt) <= 8 },
    { label: '8+ min', fn: rt => parseInt(rt) > 8 },
];

const SORT_OPTIONS = [
    { label: 'Most Recent', key: 'recent' },
    { label: 'Most Viewed', key: 'views' },
    { label: 'Most Commented', key: 'comments' },
];

function parseDate(str) { return new Date(str); }

export default function Blogs() {
    const [search, setSearch] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedReadTime, setSelectedReadTime] = useState(null);
    const [sortBy, setSortBy] = useState('recent');

    const authors = [...new Set(ALL_POSTS.map(p => p.author))];
    const categories = [...new Set(ALL_POSTS.map(p => p.category))];

    const filtered = useMemo(() => {
        let posts = [...ALL_POSTS];
        if (search.trim()) {
            const q = search.toLowerCase();
            posts = posts.filter(p =>
                p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
            );
        }
        if (selectedAuthor) posts = posts.filter(p => p.author === selectedAuthor);
        if (selectedCategory) posts = posts.filter(p => p.category === selectedCategory);
        if (selectedReadTime !== null) posts = posts.filter(p => READ_TIME_RANGES[selectedReadTime].fn(p.readTime));
        if (sortBy === 'views') posts.sort((a, b) => b.views - a.views);
        if (sortBy === 'comments') posts.sort((a, b) => b.comments - a.comments);
        if (sortBy === 'recent') posts.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        return posts;
    }, [search, selectedAuthor, selectedCategory, selectedReadTime, sortBy]);

    const clearAll = () => {
        setSearch('');
        setSelectedAuthor(null);
        setSelectedCategory(null);
        setSelectedReadTime(null);
        setSortBy('recent');
    };

    const activeFilterCount = [selectedAuthor, selectedCategory, selectedReadTime !== null ? true : null]
        .filter(Boolean).length + (sortBy !== 'recent' ? 1 : 0);

    const handlePostSelect = (post, index) => {
        console.log(`Selected post: ${post.title} at index ${index}`);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <Navbar />
            <main className="blog-page-container">

                {/* ── Page Header ── */}
                <div className="blog-page-header">
                    <h1 className="serif-heading" style={{ color: 'var(--c-white)' }}>All Posts</h1>
                    <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                        {filtered.length} of {ALL_POSTS.length} dispatches
                    </p>
                </div>

                {/* ── Search + Filter Toggle Row ── */}
                <div className="blog-topbar">
                    <div className="blog-search-bar-container">
                        <span className="blog-search-icon">⌕</span>
                        <input
                            id="blog-search"
                            type="text"
                            className="blog-search-input"
                            placeholder="Search by title or content..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className="blog-search-clear" onClick={() => setSearch('')}>✕</button>
                        )}
                    </div>

                    <button
                        className={`blog-filter-toggle-btn ${sidebarOpen ? 'open' : ''}`}
                        onClick={() => setSidebarOpen(v => !v)}
                        aria-label={sidebarOpen ? 'Close filters' : 'Open filters'}
                    >
                        <span className="blog-filter-toggle-icon">{sidebarOpen ? '✕' : '⊞'}</span>
                        <span>Filters</span>
                        {activeFilterCount > 0 && (
                            <span className="blog-filter-badge">{activeFilterCount}</span>
                        )}
                    </button>
                </div>

                {/* ── Main content: sidebar + list ── */}
                <div className="blog-content-area">

                    {/* Filter Sidebar */}
                    <aside className={`blog-filter-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
                        <div className="blog-sidebar-header">
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--c-black)' }}>
                                Filters
                            </span>
                            {activeFilterCount > 0 && (
                                <button className="blog-sidebar-clear-all" onClick={clearAll}>Clear all</button>
                            )}
                        </div>

                        <div className="blog-sidebar-group">
                            <span className="blog-sidebar-label">Author</span>
                            <div className="blog-filter-chips">
                                {authors.map(a => (
                                    <button key={a} className={`blog-filter-chip ${selectedAuthor === a ? 'active' : ''}`}
                                        onClick={() => setSelectedAuthor(selectedAuthor === a ? null : a)}>{a}</button>
                                ))}
                            </div>
                        </div>

                        <div className="blog-sidebar-group">
                            <span className="blog-sidebar-label">Category</span>
                            <div className="blog-filter-chips">
                                {categories.map(c => (
                                    <button key={c} className={`blog-filter-chip ${selectedCategory === c ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(selectedCategory === c ? null : c)}>{c}</button>
                                ))}
                            </div>
                        </div>

                        <div className="blog-sidebar-group">
                            <span className="blog-sidebar-label">Read Time</span>
                            <div className="blog-filter-chips">
                                {READ_TIME_RANGES.map((r, i) => (
                                    <button key={r.label} className={`blog-filter-chip ${selectedReadTime === i ? 'active' : ''}`}
                                        onClick={() => setSelectedReadTime(selectedReadTime === i ? null : i)}>{r.label}</button>
                                ))}
                            </div>
                        </div>

                        <div className="blog-sidebar-group">
                            <span className="blog-sidebar-label">Sort By</span>
                            <div className="blog-filter-chips">
                                {SORT_OPTIONS.map(s => (
                                    <button key={s.key} className={`blog-filter-chip ${sortBy === s.key ? 'active' : ''}`}
                                        onClick={() => setSortBy(s.key)}>{s.label}</button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Article list */}
                    <div className={`blog-list-area ${sidebarOpen ? 'sidebar-offset' : ''}`}>
                        {filtered.length === 0 ? (
                            <div className="blog-no-results">
                                <p>No dispatches match your search.</p>
                                <button className="blog-filter-clear-all" onClick={clearAll} style={{ marginTop: '1rem' }}>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <AnimatedList
                                items={filtered}
                                onItemSelect={handlePostSelect}
                                showGradients={false}
                                enableArrowNavigation={true}
                                displayScrollbar={false}
                            />
                        )}
                    </div>
                </div>

            </main>
            <div style={{ position: 'relative', zIndex: 10 }}>
                <Footer />
            </div>
        </div>
    );
}
