import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedList from '../components/blog/AnimatedList';

export default function Blogs() {
    // Dummy data matching the user's reference screenshot
    const blogPosts = [
        {
            id: 1,
            author: 'CS-BYC Admin',
            date: 'Jul 30, 2025',
            readTime: '8 min read',
            title: 'Multimodal exploration for scientific discovery - Shorya Rawal 2241347',
            excerpt: 'Multimodal exploration for scientific discovery Introduction Modern science is no longer confined to isolated experiments or...',
            views: 6,
            comments: 0,
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
            avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Admin3&backgroundColor=0d2142&textColor=ffffff'
        }
    ];

    const handlePostSelect = (post, index) => {
        console.log(`Selected post: ${post.title} at index ${index}`);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <Navbar />
            <main className="blog-page-container">
                <div className="blog-page-header">
                    <h1 className="serif-heading" style={{ color: "var(--c-white)" }}>All Posts</h1>
                </div>
                <AnimatedList
                    items={blogPosts}
                    onItemSelect={handlePostSelect}
                    showGradients={false}
                    enableArrowNavigation={true}
                    displayScrollbar={false}
                />
            </main>
            {/* The footer should sit below, adjusting Z-index so cubes stay behind */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <Footer />
            </div>
        </div>
    );
}
