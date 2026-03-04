import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ArticleList from '../components/home/ArticleList';
import WelcomeHero from '../components/home/WelcomeHero';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';
import '../styles/index.css';
import '../styles/components.css';

export default function Home() {
    return (
        <div>
            <Navbar />

            <main className="main-layout-full" style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', padding: '0 2.5rem' }}>
                <div className="articles-area" style={{ display: 'flex', flexDirection: 'column' }}>

                    <AnimateOnScroll animationClass="animate-slide-up" delay={0.2} threshold={0.05}>
                        <WelcomeHero />
                    </AnimateOnScroll>

                    <AnimateOnScroll animationClass="animate-slide-up" delay={0.1} threshold={0.1}>
                        <h2 className="serif-heading" style={{ color: 'var(--c-white)', fontSize: '2.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--c-white)', paddingBottom: '0.5rem' }}>
                            Latest Dispatches
                        </h2>
                        <ArticleList />

                        {/* Read More Blogs Link */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                            <Link to="/blogs" className="explore-btn" style={{ textDecoration: 'none' }}>
                                READ MORE &rarr;
                            </Link>
                        </div>
                    </AnimateOnScroll>

                    {/* About Section matching brutalist blocks */}
                    <AnimateOnScroll animationClass="animate-slide-up" delay={0.1} threshold={0.1}>
                        <div id="about" className="article-wrapper" style={{ marginTop: '5rem' }}>
                            <div className="article-shadow" style={{ top: '10px', left: '10px' }}></div>
                            <div className="article-card" style={{ padding: '3rem', backgroundColor: 'var(--c-white)' }}>
                                <h2 className="serif-heading" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--c-black)', paddingBottom: '0.5rem' }}>
                                    The Foundation
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: '400', lineHeight: '1.6' }}>
                                            ByteBoard is the official editorial platform by the students, for the students of the
                                            Department of Computer Science at CHRIST (Deemed to be University), Yeshwanthpur Campus.
                                        </p>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', marginBottom: '2.5rem', fontWeight: '400', lineHeight: '1.6' }}>
                                            We curate the latest happenings, technological trends, and insightful commentary straight from the academic core. Our aim is clarity over noise, documentation over speculation.
                                        </p>
                                        <a href="#connect" className="explore-btn">INQUIRE NOW</a>
                                    </div>
                                    <div style={{ width: '100%', aspectRatio: '1/1', border: '2px solid var(--c-black)', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', position: 'relative' }}>
                                        {/* Striped placeholder patterned background */}
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)' }}></div>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', zIndex: 1 }}>FIGURE 1: CS DEPT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>

                    {/* FAQ Section matching brutalist blocks */}
                    <AnimateOnScroll animationClass="animate-slide-up" delay={0.1} threshold={0.1}>
                        <div id="faq" className="article-wrapper" style={{ marginTop: '5rem', marginBottom: '5rem' }}>
                            <div className="article-shadow" style={{ top: '10px', left: '10px' }}></div>
                            <div className="article-card" style={{ padding: '3rem', backgroundColor: 'var(--c-white)' }}>
                                <h2 className="serif-heading" style={{ fontSize: '2.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--c-black)', paddingBottom: '0.5rem' }}>
                                    Frequently Asked Questions
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                    <div style={{ border: '2px solid var(--c-black)', padding: '1.5rem', backgroundColor: '#f9f9f9' }}>
                                        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                                            Q: Who can write for ByteBoard?
                                        </h3>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', lineHeight: '1.5' }}>
                                            A: Any student currently enrolled in the Department of Computer Science at the Yeshwanthpur Campus can pitch an article.
                                        </p>
                                    </div>

                                    <div style={{ border: '2px solid var(--c-black)', padding: '1.5rem', backgroundColor: '#f9f9f9' }}>
                                        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                                            Q: What kind of topics do you cover?
                                        </h3>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', lineHeight: '1.5' }}>
                                            A: We cover everything from deep dives into AI/ML, Cybersecurity, web development tutorials, and op-eds on tech ethics, to campus event roundups.
                                        </p>
                                    </div>

                                    <div style={{ border: '2px solid var(--c-black)', padding: '1.5rem', backgroundColor: '#f9f9f9' }}>
                                        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                                            Q: How often is new content published?
                                        </h3>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', lineHeight: '1.5' }}>
                                            A: New dispatches are typically released on a bi-weekly basis during the academic semester.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>

                    {/* Connect Section matching brutalist blocks */}
                    <AnimateOnScroll animationClass="animate-pop" delay={0.1} threshold={0.1}>
                        <div id="connect" className="article-wrapper" style={{ marginBottom: '5rem' }}>
                            <div className="article-shadow" style={{ top: '10px', left: '10px' }}></div>
                            <div className="article-card" style={{ padding: '3rem', backgroundColor: 'var(--c-white)' }}>
                                <h2 className="serif-heading" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--c-black)', paddingBottom: '0.5rem' }}>
                                    Connect
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '3rem' }}>

                                    <div>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                                            Have a story to pitch? Found a bug in our code? Or just want to talk about the latest tech trends? Drop us a line.
                                        </p>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--c-black)', color: 'var(--c-white)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>@</div>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>editorial@byteboard.cs</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--c-black)', color: 'var(--c-white)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>📍</div>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>CS Department, Block A</span>
                                            </div>
                                        </div>
                                    </div>

                                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', textTransform: 'uppercase' }}>Name</label>
                                            <input type="text" placeholder="John Doe" style={{ padding: '1rem', border: '2px solid var(--c-black)', fontFamily: 'var(--font-mono)', backgroundColor: '#f9f9f9', outline: 'none' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', textTransform: 'uppercase' }}>Email</label>
                                            <input type="email" placeholder="john@example.com" style={{ padding: '1rem', border: '2px solid var(--c-black)', fontFamily: 'var(--font-mono)', backgroundColor: '#f9f9f9', outline: 'none' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', textTransform: 'uppercase' }}>Message</label>
                                            <textarea rows={4} placeholder="Your message here..." style={{ padding: '1rem', border: '2px solid var(--c-black)', fontFamily: 'var(--font-mono)', backgroundColor: '#f9f9f9', outline: 'none', resize: 'vertical' }}></textarea>
                                        </div>
                                        <button type="button" className="explore-btn" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>SEND TRANSMISSION</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </main>

            <Footer />
        </div>
    );
}
