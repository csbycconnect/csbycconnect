import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'motion/react';
import { Heart, MoreVertical } from 'lucide-react';
import '../../styles/components.css'; // ensure components.css is loaded

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.1, once: false }); // reduced amount for larger items
    return (
        <motion.div
            ref={ref}
            data-index={index}
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.4, delay }}
            className="blog-animated-item"
        >
            {children}
        </motion.div>
    );
};

const BlogCard = ({ post }) => {
    return (
        <div className="blog-card">
            <div className="blog-card-header">
                <div className="blog-card-meta">
                    <img src={post.avatar || "https://api.dicebear.com/9.x/initials/svg?seed=CS"} alt="Avatar" className="blog-avatar" />
                    <div className="blog-meta-text">
                        <span className="blog-author">{post.author}</span>
                        <div className="blog-date-time">
                            <span>{post.date}</span>
                            <span className="bullet">•</span>
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>
                <button className="blog-menu-btn">
                    <MoreVertical size={20} color="var(--c-white)" />
                </button>
            </div>

            <div className="blog-card-content">
                <h2 className="serif-heading blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
            </div>

            <div className="blog-card-footer">
                <div className="blog-footer-stats">
                    <span>{post.views} views</span>
                    <span>{post.comments} comments</span>
                </div>
                <button className="blog-like-btn">
                    <Heart size={20} color="#ff4d4d" />
                </button>
            </div>
        </div>
    );
};

const AnimatedList = ({
    items = [],
    onItemSelect,
    showGradients = false, // disabled by default to match clean aesthetic
    enableArrowNavigation = true,
    displayScrollbar = false, // disabled to match clean aesthetic
    initialSelectedIndex = -1
}) => {
    const listRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
    const [keyboardNav, setKeyboardNav] = useState(false);
    const [topGradientOpacity, setTopGradientOpacity] = useState(0);
    const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

    const handleItemMouseEnter = useCallback((index) => {
        setSelectedIndex(index);
    }, []);

    const handleItemClick = useCallback(
        (item, index) => {
            setSelectedIndex(index);
            if (onItemSelect) {
                onItemSelect(item, index);
            }
        },
        [onItemSelect]
    );

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        setTopGradientOpacity(Math.min(scrollTop / 50, 1));
        const bottomDistance = scrollHeight - (scrollTop + clientHeight);
        setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
    };

    useEffect(() => {
        if (!enableArrowNavigation || items.length === 0) return;
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
            } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    e.preventDefault();
                    if (onItemSelect) {
                        onItemSelect(items[selectedIndex], selectedIndex);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

    useEffect(() => {
        if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
        const container = listRef.current;
        const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
        if (selectedItem) {
            const extraMargin = 50;
            const containerScrollTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            const itemTop = selectedItem.offsetTop;
            const itemBottom = itemTop + selectedItem.offsetHeight;
            if (itemTop < containerScrollTop + extraMargin) {
                container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
            } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
                container.scrollTo({
                    top: itemBottom - containerHeight + extraMargin,
                    behavior: 'smooth'
                });
            }
        }
        setKeyboardNav(false);
    }, [selectedIndex, keyboardNav]);

    if (!items || items.length === 0) return null;

    return (
        <div className="blog-list-container" style={{ position: 'relative', width: '100%' }}>
            <div
                ref={listRef}
                className={`blog-list-scrollarea ${displayScrollbar ? 'with-scrollbar' : 'scrollbar-hide'}`}
                onScroll={handleScroll}
            >
                {items.map((item, index) => (
                    <AnimatedItem
                        key={item.id || index}
                        delay={index * 0.1}
                        index={index}
                        onMouseEnter={() => handleItemMouseEnter(index)}
                        onClick={() => handleItemClick(item, index)}
                    >
                        <BlogCard post={item} />
                    </AnimatedItem>
                ))}
            </div>
            {showGradients && (
                <>
                    <div
                        className="scroll-gradient-top"
                        style={{ opacity: topGradientOpacity }}
                    ></div>
                    <div
                        className="scroll-gradient-bottom"
                        style={{ opacity: bottomGradientOpacity }}
                    ></div>
                </>
            )}
        </div>
    );
};

export default AnimatedList;
