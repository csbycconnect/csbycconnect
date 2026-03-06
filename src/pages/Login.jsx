import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimateOnScroll from '../components/shared/AnimateOnScroll';
import ShuffleText from '../components/shared/ShuffleText';
import BackButton from '../components/shared/BackButton';

export default function Login() {
    // Read optional ?register query parameter
    const queryParams = new URLSearchParams(window.location.search);
    const initialRegisterMode = queryParams.get('register') === 'true';

    const [tab, setTab] = useState('student'); // 'student' | 'admin'
    const [isRegisterMode, setIsRegisterMode] = useState(initialRegisterMode);

    const [studentForm, setStudentForm] = useState({ name: '', email: '', password: '' });
    const [adminForm, setAdminForm] = useState({ username: '', password: '', secretKey: '' });
    const [showStudentPw, setShowStudentPw] = useState(false);
    const [showAdminPw, setShowAdminPw] = useState(false);

    const handleStudentSubmit = (e) => {
        e.preventDefault();
        // Placeholder — wire up real auth here
        alert(`Student login: ${studentForm.email}`);
    };

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        // Placeholder — wire up real admin auth here
        alert(`Admin login: ${adminForm.username}`);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ maxWidth: '560px', margin: '0 auto', padding: '0 2.5rem 5rem' }}>
                <BackButton />

                <AnimateOnScroll animationClass="animate-slide-up" delay={0.1} threshold={0.05}>
                    <div style={{ marginBottom: '2.5rem', borderBottom: '2px solid var(--c-white)', paddingBottom: '1rem' }}>
                        <h1 className="serif-heading" style={{ color: 'var(--c-white)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
                            {tab === 'student' && isRegisterMode ? 'Register' : 'Login'}<span style={{ color: 'var(--c-yellow)' }}>.</span>
                        </h1>
                        <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                            {tab === 'student' && isRegisterMode ? 'Create a new ByteBoard account.' : 'Access your ByteBoard account.'}
                        </p>
                    </div>
                </AnimateOnScroll>

                <AnimateOnScroll animationClass="animate-pop" delay={0.15} threshold={0.05}>
                    <div style={{ position: 'relative' }}>
                        {/* shadow */}
                        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '100%', height: '100%', border: '2px solid var(--c-yellow)', zIndex: 0 }} />
                        <div style={{ position: 'relative', zIndex: 1, backgroundColor: 'var(--c-white)', border: '2px solid var(--c-black)' }}>

                            {/* Tabs */}
                            <div style={{ display: 'flex', borderBottom: '2px solid var(--c-black)' }}>
                                {[
                                    { key: 'student', label: '01 — Student' },
                                    { key: 'admin', label: '02 — Admin' },
                                ].map(({ key, label }) => (
                                    <button
                                        key={key}
                                        onClick={() => setTab(key)}
                                        style={{
                                            flex: 1,
                                            fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem',
                                            textTransform: 'uppercase', letterSpacing: '0.08em',
                                            padding: '1rem',
                                            border: 'none',
                                            borderRight: key === 'student' ? '2px solid var(--c-black)' : 'none',
                                            backgroundColor: tab === key ? 'var(--c-black)' : 'transparent',
                                            color: tab === key ? 'var(--c-yellow)' : 'var(--c-black)',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* Student Form */}
                            {tab === 'student' && (
                                <form onSubmit={handleStudentSubmit} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {isRegisterMode && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={labelStyle}>Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="John Doe"
                                                value={studentForm.name}
                                                onChange={e => setStudentForm(p => ({ ...p, name: e.target.value }))}
                                                style={inputStyle}
                                                onFocus={e => e.target.style.boxShadow = '4px 4px 0 var(--c-yellow)'}
                                                onBlur={e => e.target.style.boxShadow = 'none'}
                                            />
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={labelStyle}>Student Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@christuniversity.in"
                                            value={studentForm.email}
                                            onChange={e => setStudentForm(p => ({ ...p, email: e.target.value }))}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.boxShadow = '4px 4px 0 var(--c-yellow)'}
                                            onBlur={e => e.target.style.boxShadow = 'none'}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={labelStyle}>Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type={showStudentPw ? 'text' : 'password'}
                                                required
                                                placeholder="••••••••"
                                                value={studentForm.password}
                                                onChange={e => setStudentForm(p => ({ ...p, password: e.target.value }))}
                                                style={{ ...inputStyle, paddingRight: '3.5rem' }}
                                                onFocus={e => e.target.style.boxShadow = '4px 4px 0 var(--c-yellow)'}
                                                onBlur={e => e.target.style.boxShadow = 'none'}
                                            />
                                            <button type="button" onClick={() => setShowStudentPw(v => !v)} style={eyeBtnStyle}>{showStudentPw ? '🙈' : '👁'}</button>
                                        </div>
                                    </div>
                                    {!isRegisterMode && (
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <a href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#555', textDecoration: 'underline' }}>Forgot password?</a>
                                        </div>
                                    )}
                                    <button type="submit" style={submitBtnStyle}>
                                        <ShuffleText text={isRegisterMode ? "Register as Student →" : "Login as Student →"} />
                                    </button>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#555', textAlign: 'center' }}>
                                        {isRegisterMode ? (
                                            <>Already have an account? <button type="button" onClick={() => setIsRegisterMode(false)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--c-black)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Login here</button></>
                                        ) : (
                                            <>No account? <button type="button" onClick={() => setIsRegisterMode(true)} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--c-black)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>Register here</button></>
                                        )}
                                    </p>
                                </form>
                            )}

                            {/* Admin Form */}
                            {tab === 'admin' && (
                                <form onSubmit={handleAdminSubmit} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {/* Admin warning banner */}
                                    <div style={{
                                        backgroundColor: '#0A192F', color: 'var(--c-yellow)',
                                        border: '2px solid var(--c-yellow)',
                                        padding: '0.75rem 1rem',
                                        fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700,
                                        textTransform: 'uppercase', letterSpacing: '0.05em',
                                    }}>
                                        ⚠ Restricted — Authorized Personnel Only
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={labelStyle}>Admin Username</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="admin_handle"
                                            value={adminForm.username}
                                            onChange={e => setAdminForm(p => ({ ...p, username: e.target.value }))}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.boxShadow = '4px 4px 0 var(--c-yellow)'}
                                            onBlur={e => e.target.style.boxShadow = 'none'}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={labelStyle}>Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type={showAdminPw ? 'text' : 'password'}
                                                required
                                                placeholder="••••••••"
                                                value={adminForm.password}
                                                onChange={e => setAdminForm(p => ({ ...p, password: e.target.value }))}
                                                style={{ ...inputStyle, paddingRight: '3.5rem' }}
                                                onFocus={e => e.target.style.boxShadow = '4px 4px 0 var(--c-yellow)'}
                                                onBlur={e => e.target.style.boxShadow = 'none'}
                                            />
                                            <button type="button" onClick={() => setShowAdminPw(v => !v)} style={eyeBtnStyle}>{showAdminPw ? '🙈' : '👁'}</button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={labelStyle}>Secret Key</label>
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••••••"
                                            value={adminForm.secretKey}
                                            onChange={e => setAdminForm(p => ({ ...p, secretKey: e.target.value }))}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.boxShadow = '4px 4px 0 var(--c-yellow)'}
                                            onBlur={e => e.target.style.boxShadow = 'none'}
                                        />
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#888' }}>Issued by the ByteBoard editorial team.</span>
                                    </div>
                                    <button type="submit" style={{ ...submitBtnStyle, backgroundColor: 'var(--c-black)', color: 'var(--c-yellow)', boxShadow: '6px 6px 0 var(--c-yellow)' }}>
                                        <ShuffleText text="Login as Admin →" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </AnimateOnScroll>
            </main>
            <Footer />
        </div>
    );
}

/* ── Micro-styles ── */
const labelStyle = {
    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.8rem',
    textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--c-black)',
};

const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
    border: '2px solid var(--c-black)',
    backgroundColor: '#f9f9f9',
    outline: 'none',
    color: 'var(--c-black)',
    transition: 'box-shadow 0.15s',
};

const submitBtnStyle = {
    fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    backgroundColor: 'var(--c-black)', color: 'var(--c-white)',
    border: '2px solid var(--c-black)', boxShadow: '6px 6px 0 var(--c-black)',
    padding: '0.85rem 1.5rem', cursor: 'pointer',
    transition: 'transform 0.1s, box-shadow 0.1s',
};

const eyeBtnStyle = {
    position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', lineHeight: 1,
};
