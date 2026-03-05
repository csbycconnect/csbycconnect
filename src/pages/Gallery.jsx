import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import ShuffleText from '../components/shared/ShuffleText';
import BackButton from '../components/shared/BackButton';
import { useAuth } from '../context/AuthContext';
import AuthGateModal from '../components/shared/AuthGateModal';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FOLDERS = [
    { id: 'hackathon-2025', label: 'Hackathon 2025', club: 'CS Dept', month: 'Mar 2025' },
    { id: 'ai-ethics', label: 'AI Ethics Lecture', club: 'CS Dept', month: 'Mar 2025' },
    { id: 'pitch-session', label: 'ByteBoard Pitch', club: 'ByteBoard', month: 'Apr 2025' },
    { id: 'react-workshop', label: 'React Deep Dive', club: 'CS Dept', month: 'Apr 2025' },
    { id: 'cultural-fest', label: 'Cultural Fest', club: 'Cultural', month: 'Feb 2025' },
    { id: 'dept-day', label: 'Department Day 2025', club: 'CS Dept', month: 'Jan 2025' },
];

const mk = (folderId, club, month, seed, n) =>
    Array.from({ length: n }, (_, i) => ({
        id: `${folderId}-${i}`,
        folderId, club, month,
        title: FOLDERS.find(f => f.id === folderId)?.label + ` — ${String(i + 1).padStart(2, '0')}`,
        src: `https://picsum.photos/seed/${seed + i}/1200/800`,
        thumb: `https://picsum.photos/seed/${seed + i}/600/400`,
    }));

const ALL_PHOTOS = [
    ...mk('hackathon-2025', 'CS Dept', 'Mar 2025', 10, 12),
    ...mk('ai-ethics', 'CS Dept', 'Mar 2025', 30, 8),
    ...mk('pitch-session', 'ByteBoard', 'Apr 2025', 50, 10),
    ...mk('react-workshop', 'CS Dept', 'Apr 2025', 70, 10),
    ...mk('cultural-fest', 'Cultural', 'Feb 2025', 90, 8),
    ...mk('dept-day', 'CS Dept', 'Jan 2025', 112, 9),
];

const ALL_CLUBS = ['All Clubs', ...new Set(FOLDERS.map(f => f.club))];
const ALL_MONTHS = ['All Dates', ...new Set(FOLDERS.map(f => f.month))];

const SHARE_PLATFORMS = [
    {
        id: 'whatsapp', label: 'WhatsApp', icon: 'WA', bg: '#25D366', fg: '#fff',
        action: (url, txt) => window.open(`https://wa.me/?text=${encodeURIComponent(txt + '\n' + url)}`, '_blank')
    },
    {
        id: 'twitter', label: 'X (Twitter)', icon: 'X', bg: '#000', fg: '#fff',
        action: (url, txt) => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(txt)}`, '_blank')
    },
    {
        id: 'linkedin', label: 'LinkedIn', icon: 'in', bg: '#0077B5', fg: '#fff',
        action: (url) => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    },
    { id: 'copy', label: 'Copy Link', icon: '⌘', bg: '#0A192F', fg: '#f7d000', action: null },
    {
        id: 'download', label: 'Download', icon: '↓', bg: '#f7d000', fg: '#000',
        action: (url, _, name) => { const a = document.createElement('a'); a.href = url; a.download = name || 'photo.jpg'; document.body.appendChild(a); a.click(); document.body.removeChild(a); }
    },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const S = {
    page: (navbarHidden) => ({ position: 'relative', minHeight: '100vh', paddingBottom: navbarHidden ? '0' : '4rem' }),
    explorer: (navbarHidden) => ({
        maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10,
        padding: navbarHidden ? '0' : '0 2rem 2rem',
        transition: 'padding 0.35s ease',
    }),
    window: (navbarHidden) => ({
        border: navbarHidden ? 'none' : '2px solid #000',
        boxShadow: navbarHidden ? 'none' : '10px 10px 0 #f7d000',
        background: '#fff', display: 'flex', flexDirection: 'column',
        minHeight: navbarHidden ? '100vh' : '78vh', overflow: 'hidden',
        transition: 'min-height 0.35s ease, box-shadow 0.35s ease',
    }),
    titleBar: {
        background: '#0A192F', padding: '0.55rem 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '2px solid #000', userSelect: 'none', flexShrink: 0,
    },
    titleBarTitle: {
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: '0.82rem',
        color: '#f7d000', letterSpacing: '0.06em',
    },
    winBtnRow: { display: 'flex', gap: '6px' },
    winBtn: (bg, cursor) => ({
        width: 13, height: 13, borderRadius: '50%', background: bg,
        border: '1.5px solid rgba(0,0,0,0.5)', cursor: cursor || 'default', flexShrink: 0,
    }),
    toolbar: {
        background: '#f5f0e8', borderBottom: '2px solid #000',
        padding: '0.45rem 1rem', display: 'flex', alignItems: 'center',
        gap: '0.65rem', flexShrink: 0, flexWrap: 'wrap',
    },
    toolbarDivider: { width: 1, height: 22, background: '#bbb', flexShrink: 0 },
    toolbarBtn: (enabled) => ({
        fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', fontWeight: 700,
        border: '2px solid #000', background: enabled ? '#fff' : '#f0f0f0',
        color: enabled ? '#0A192F' : '#bbb',
        padding: '0.25rem 0.55rem', cursor: enabled ? 'pointer' : 'default',
        transition: 'all 0.12s', display: 'flex', alignItems: 'center',
    }),
    breadcrumb: {
        flex: 1, display: 'flex', alignItems: 'center', gap: '0.35rem',
        fontFamily: 'Space Mono, monospace', fontSize: '0.78rem', fontWeight: 700,
        color: '#0A192F', background: '#fff', border: '2px solid #ccc',
        padding: '0.25rem 0.75rem', minWidth: 0,
    },
    searchBoxWrap: {
        display: 'flex', alignItems: 'center', border: '2px solid #000',
        background: '#fff', padding: '0 0.5rem',
    },
    searchInput: {
        fontFamily: 'Space Mono, monospace', fontSize: '0.75rem',
        border: 'none', outline: 'none', padding: '0.25rem 0.5rem',
        color: '#0A192F', width: 160, background: 'transparent',
    },
    body: { display: 'flex', flex: 1, minHeight: 0 },
    sidebar: {
        width: 220, borderRight: '2px solid #000', background: '#f9f9f9',
        display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto',
    },
    sidebarSection: {
        padding: '0.6rem 1rem 0.3rem',
        fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999',
    },
    sidebarDivider: { height: 1, background: '#e0e0e0', margin: '0.3rem 0' },
    folderRow: (active) => ({
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.45rem 0.75rem 0.45rem 1rem',
        cursor: 'pointer', userSelect: 'none',
        background: active ? '#0A192F' : 'transparent',
        color: active ? '#f7d000' : '#222',
        borderLeft: `3px solid ${active ? '#f7d000' : 'transparent'}`,
        fontFamily: 'Space Mono, monospace', fontSize: '0.72rem',
        fontWeight: active ? 700 : 400, transition: 'all 0.12s',
    }),
    folderBadge: (active) => ({
        marginLeft: 'auto', fontSize: '0.6rem', fontFamily: 'Space Mono, monospace',
        color: active ? '#f7d000' : '#888',
        background: active ? 'rgba(247,208,0,0.18)' : '#e8e8e8',
        padding: '1px 6px', borderRadius: 2, flexShrink: 0,
    }),
    mainCol: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
    filterBar: {
        background: '#fafafa', borderBottom: '1.5px solid #ddd',
        padding: '0.45rem 1rem', display: 'flex', alignItems: 'center',
        gap: '0.65rem', flexShrink: 0, flexWrap: 'wrap',
    },
    filterLabel: {
        fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', fontWeight: 700,
        color: '#777', textTransform: 'uppercase', letterSpacing: '0.09em',
    },
    filterSelect: {
        fontFamily: 'Space Mono, monospace', fontSize: '0.72rem',
        border: '2px solid #000', background: '#fff', color: '#0A192F',
        padding: '0.2rem 0.5rem', cursor: 'pointer', outline: 'none',
    },
    viewToggle: (active) => ({
        fontFamily: 'Space Mono, monospace', fontSize: '1rem',
        border: '2px solid #000', padding: '0.1rem 0.45rem', cursor: 'pointer',
        background: active ? '#0A192F' : '#fff', color: active ? '#f7d000' : '#0A192F',
        transition: 'all 0.12s',
    }),
    iconBtn: (accent) => ({
        width: 30, height: 30, border: '2px solid #000', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Space Mono, monospace', fontSize: '1rem', fontWeight: 700,
        background: accent ? '#f7d000' : '#fff', color: accent ? '#000' : '#0A192F',
        boxShadow: '2px 2px 0 #000', transition: 'all 0.12s', flexShrink: 0,
    }),
    grid: (large) => ({
        flex: 1, overflowY: 'auto', padding: '1rem', background: '#fff',
        display: 'grid',
        gridTemplateColumns: large ? 'repeat(auto-fill, minmax(280px, 1fr))' : 'repeat(auto-fill, minmax(165px, 1fr))',
        gap: large ? '1.25rem' : '0.75rem',
        alignContent: 'start',
        scrollbarWidth: 'thin',
        scrollbarColor: '#f7d000 #0A192F',
    }),
    emptyState: {
        gridColumn: '1/-1', textAlign: 'center', padding: '5rem 2rem',
        fontFamily: 'Space Mono, monospace', color: '#ccc', fontSize: '0.9rem',
    },
    card: (selected, hovered) => ({
        position: 'relative', cursor: 'pointer',
        border: `2px solid ${selected ? '#f7d000' : hovered ? '#000' : '#ddd'}`,
        boxShadow: selected ? '3px 3px 0 #f7d000' : hovered ? '3px 3px 0 #000' : 'none',
        background: '#f0f0f0', overflow: 'hidden',
        transition: 'border-color 0.15s, box-shadow 0.15s',
    }),
    cardImg: { width: '100%', aspectRatio: '3/2', objectFit: 'cover', display: 'block', userSelect: 'none' },
    cardCaption: {
        padding: '0.3rem 0.5rem', fontFamily: 'Space Mono, monospace',
        fontSize: '0.6rem', color: '#444', whiteSpace: 'nowrap',
        overflow: 'hidden', textOverflow: 'ellipsis',
        background: '#f9f9f9', borderTop: '1px solid #e0e0e0',
    },
    cardMeta: {
        padding: '0.15rem 0.5rem 0.35rem',
        fontFamily: 'Space Mono, monospace', fontSize: '0.55rem', color: '#999',
        background: '#f9f9f9',
    },
    selectCircle: (selected, hovered) => ({
        position: 'absolute', top: 7, left: 7, zIndex: 2,
        width: 22, height: 22, borderRadius: '50%',
        border: `2px solid ${selected ? '#f7d000' : 'rgba(255,255,255,0.9)'}`,
        boxShadow: '0 1px 5px rgba(0,0,0,0.35)',
        background: selected ? '#f7d000' : hovered ? 'rgba(255,255,255,0.6)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.7rem', fontWeight: 900, color: '#000',
        cursor: 'pointer', transition: 'all 0.15s',
    }),
    statusBar: {
        background: '#0A192F', borderTop: '2px solid #000', padding: '0.4rem 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'Space Mono, monospace', fontSize: '0.68rem',
        color: 'rgba(255,255,255,0.55)', flexShrink: 0,
    },
    shareMainBtn: {
        background: '#f7d000', border: '2px solid #000', color: '#000',
        fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: '0.72rem',
        padding: '0.28rem 1rem', cursor: 'pointer', boxShadow: '3px 3px 0 #000',
        transition: 'all 0.12s', display: 'flex', alignItems: 'center', gap: '0.4rem',
    },
};

// ─── PHOTO MODAL ─────────────────────────────────────────────────────────────
function PhotoModal({ modal, photos, onClose, onNavigate, onShare }) {
    const [sliding, setSliding] = useState(false);
    const [dir, setDir] = useState(0);

    const navigate = (d) => {
        const next = modal.index + d;
        if (next < 0 || next >= photos.length) return;
        setDir(d);
        setSliding(true);
        setTimeout(() => { onNavigate(next); setSliding(false); }, 160);
    };

    const imgStyle = {
        display: 'block', maxWidth: '88vw', maxHeight: '70vh', objectFit: 'contain',
        transition: 'transform 0.16s ease, opacity 0.16s ease',
        transform: sliding ? (dir > 0 ? 'translateX(-40px)' : 'translateX(40px)') : 'translateX(0)',
        opacity: sliding ? 0 : 1,
    };

    const btnBase = {
        fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: '0.9rem',
        padding: '0.6rem 2.2rem', cursor: 'pointer', border: '3px solid #000',
        transition: 'all 0.12s',
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.93)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
                <div style={{ background: '#0A192F', border: '2px solid #000', borderBottom: 'none', padding: '0.45rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.75rem', fontWeight: 700, color: '#f7d000' }}>📷 {modal.photo.title}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>{modal.index + 1} / {photos.length}</span>
                        <button onClick={onClose} style={{ background: '#ff5f56', border: '1.5px solid #000', borderRadius: '50%', width: 14, height: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 900, color: '#000' }}>✕</button>
                    </div>
                </div>
                <div style={{ border: '2px solid #000', borderBottom: 'none', overflow: 'hidden', background: '#111' }}>
                    <img src={modal.photo.src} alt={modal.photo.title} style={imgStyle} draggable={false} />
                </div>
                <div style={{ background: '#0A192F', border: '2px solid #000', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', boxShadow: '6px 6px 0 #f7d000' }}>
                    <div>
                        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', fontWeight: 700, color: '#f7d000' }}>{modal.photo.folderId.replace(/-/g, ' ').toUpperCase()}</div>
                        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{modal.photo.month} · {modal.photo.club}</div>
                    </div>
                    <button style={S.shareMainBtn} onClick={onShare}><ShuffleText text="↑ SHARE" /></button>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.4rem' }} onClick={e => e.stopPropagation()}>
                <button
                    onClick={() => navigate(-1)} disabled={modal.index === 0}
                    style={{ ...btnBase, background: modal.index === 0 ? 'rgba(255,255,255,0.08)' : '#fff', color: modal.index === 0 ? 'rgba(255,255,255,0.25)' : '#000', borderColor: modal.index === 0 ? 'rgba(255,255,255,0.15)' : '#000', boxShadow: modal.index === 0 ? 'none' : '4px 4px 0 #f7d000', cursor: modal.index === 0 ? 'default' : 'pointer' }}
                ><ShuffleText text="← PREV" /></button>
                <button
                    onClick={() => navigate(1)} disabled={modal.index === photos.length - 1}
                    style={{ ...btnBase, background: modal.index === photos.length - 1 ? 'rgba(255,255,255,0.08)' : '#0A192F', color: modal.index === photos.length - 1 ? 'rgba(255,255,255,0.25)' : '#f7d000', borderColor: modal.index === photos.length - 1 ? 'rgba(255,255,255,0.15)' : '#000', boxShadow: modal.index === photos.length - 1 ? 'none' : '4px 4px 0 #f7d000', cursor: modal.index === photos.length - 1 ? 'default' : 'pointer' }}
                ><ShuffleText text="NEXT →" /></button>
            </div>
        </div>
    );
}

// ─── SHARE MODAL ─────────────────────────────────────────────────────────────
function ShareModal({ count, targetUrl, targetName, onClose }) {
    const [copiedMsg, setCopiedMsg] = useState('');
    const doShare = (platform) => {
        const txt = 'Check out these photos from ByteBoard Gallery!';
        if (platform.id === 'copy') {
            navigator.clipboard.writeText(targetUrl).then(() => { setCopiedMsg('Copied!'); setTimeout(() => setCopiedMsg(''), 2000); });
        } else if (platform.action) { platform.action(targetUrl, txt, targetName); }
    };
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
            <div style={{ background: '#fff', border: '3px solid #000', boxShadow: '10px 10px 0 #f7d000', minWidth: 360, maxWidth: 420 }} onClick={e => e.stopPropagation()}>
                <div style={{ background: '#0A192F', borderBottom: '2px solid #000', padding: '0.7rem 1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: '0.82rem', color: '#f7d000' }}>↑ Share {count > 1 ? `${count} photos` : 'photo'}</span>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1 }}>✕</button>
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {SHARE_PLATFORMS.map(p => (
                        <button key={p.id}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.7rem 1rem', background: p.bg, color: p.fg, border: '2px solid #000', boxShadow: '4px 4px 0 #000', fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left', transition: 'transform 0.1s, box-shadow 0.1s' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '2px 2px 0 #000'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '4px 4px 0 #000'; }}
                            onClick={() => doShare(p)}
                        >
                            <span style={{ fontFamily: 'Space Mono, monospace', fontWeight: 900, fontSize: '0.9rem', minWidth: 22, textAlign: 'center' }}>{p.icon}</span>
                            <ShuffleText text={p.id === 'copy' && copiedMsg ? '✓ Copied!' : p.label} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Gallery() {
    const [activeFolder, setActiveFolder] = useState('all');
    const [sel, setSel] = useState(new Set());
    const [hoveredId, setHoveredId] = useState(null);
    const [modal, setModal] = useState(null);
    const [shareOpen, setShareOpen] = useState(false);
    const [filterClub, setFilterClub] = useState('All Clubs');
    const [filterMonth, setFilterMonth] = useState('All Dates');
    const [viewMode, setViewMode] = useState('grid');
    const [search, setSearch] = useState('');
    const [navbarHidden, setNavbarHidden] = useState(false);

    // ── Navigation history (for ← → toolbar buttons) ─────────────────────────
    const [navHistory, setNavHistory] = useState(['all']);  // stack of folder ids
    const [navIdx, setNavIdx] = useState(0);        // pointer into stack

    const canBack = navIdx > 0;
    const canForward = navIdx < navHistory.length - 1;

    // Derived: filtered photos
    const photos = useMemo(() => {
        let list = activeFolder === 'all' ? ALL_PHOTOS : ALL_PHOTOS.filter(p => p.folderId === activeFolder);
        if (filterClub !== 'All Clubs') list = list.filter(p => p.club === filterClub);
        if (filterMonth !== 'All Dates') list = list.filter(p => p.month === filterMonth);
        if (search.trim()) { const q = search.toLowerCase(); list = list.filter(p => p.title.toLowerCase().includes(q) || p.club.toLowerCase().includes(q) || p.month.toLowerCase().includes(q)); }
        return list;
    }, [activeFolder, filterClub, filterMonth, search]);

    // Keyboard nav in modal
    useEffect(() => {
        if (!modal) return;
        const onKey = (e) => {
            if (e.key === 'ArrowRight') gotoModal(modal.index + 1);
            if (e.key === 'ArrowLeft') gotoModal(modal.index - 1);
            if (e.key === 'Escape') setModal(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [modal, photos]);

    // Navbar slide animation — toggle a class on the navbar element via CSS var
    useEffect(() => {
        const navbar = document.querySelector('nav, header, [class*="navbar"], [class*="nav-"]');
        if (!navbar) return;
        if (navbarHidden) {
            navbar.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.opacity = '0';
            navbar.style.pointerEvents = 'none';
        } else {
            navbar.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
            navbar.style.pointerEvents = '';
        }
    }, [navbarHidden]);

    const gotoModal = useCallback((idx) => {
        if (idx < 0 || idx >= photos.length) return;
        setModal({ photo: photos[idx], index: idx });
    }, [photos]);

    const toggleSel = useCallback((id, e) => {
        e.stopPropagation();
        setSel(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    }, []);

    const openModal = useCallback((photo, idx) => setModal({ photo, index: idx }), []);

    // Navigate to folder — push to history
    const setFolder = (id) => {
        setActiveFolder(id);
        setSel(new Set());
        setFilterClub('All Clubs');
        setFilterMonth('All Dates');
        setSearch('');
        // Trim forward history, push new entry
        setNavHistory(prev => [...prev.slice(0, navIdx + 1), id]);
        setNavIdx(prev => prev + 1);
    };

    // Toolbar ← → navigate through history
    const goBack = () => {
        if (!canBack) return;
        const newIdx = navIdx - 1;
        setNavIdx(newIdx);
        const id = navHistory[newIdx];
        setActiveFolder(id);
        setSel(new Set());
        setFilterClub('All Clubs');
        setFilterMonth('All Dates');
        setSearch('');
    };

    const goForward = () => {
        if (!canForward) return;
        const newIdx = navIdx + 1;
        setNavIdx(newIdx);
        const id = navHistory[newIdx];
        setActiveFolder(id);
        setSel(new Set());
        setFilterClub('All Clubs');
        setFilterMonth('All Dates');
        setSearch('');
    };

    const { user } = useAuth();
    const [showGate, setShowGate] = useState(false);
    const [gateAction, setGateAction] = useState('share or download photos');

    const requireAuth = (action, fn) => {
        if (!user) { setGateAction(action); setShowGate(true); return; }
        fn();
    };

    const activeFolderLabel = activeFolder === 'all' ? 'All Photos' : FOLDERS.find(f => f.id === activeFolder)?.label;

    const shareTarget = modal ? modal.photo : ALL_PHOTOS.find(p => sel.has(p.id));

    return (
        <div style={S.page(navbarHidden)}>
            {showGate && <AuthGateModal action={gateAction} onClose={() => setShowGate(false)} />}
            <Navbar />
            <main style={S.explorer(navbarHidden)}>
                <BackButton />
                <div style={S.window(navbarHidden)}>

                    {/* ── Title Bar ── */}
                    <div style={S.titleBar}>
                        <div style={S.titleBarTitle}>
                            <span style={{ fontSize: '0.9rem' }}>📁</span>
                            <span>ByteBoard Gallery — File Explorer</span>
                        </div>
                        <div style={S.winBtnRow}>
                            {/* Red — no-op */}
                            <div style={S.winBtn('#ff5f56')} title="Close" />
                            {/* Yellow — no-op */}
                            <div style={S.winBtn('#ffbe2e')} title="Minimise" />
                            {/* Green — toggle navbar */}
                            <div
                                style={{ ...S.winBtn('#28c840', 'pointer'), boxShadow: navbarHidden ? '0 0 0 2px #28c840' : 'none' }}
                                title={navbarHidden ? 'Restore navbar' : 'Fullscreen (hide navbar)'}
                                onClick={() => setNavbarHidden(v => !v)}
                            />
                        </div>
                    </div>

                    {/* ── Toolbar ── */}
                    <div style={S.toolbar}>
                        {/* History back/forward */}
                        <button style={S.toolbarBtn(canBack)} onClick={goBack} title="Back">←</button>
                        <button style={S.toolbarBtn(canForward)} onClick={goForward} title="Forward">→</button>
                        <button
                            style={S.toolbarBtn(activeFolder !== 'all')}
                            onClick={() => activeFolder !== 'all' && setFolder('all')}
                            title="Up to All Photos"
                        >↑</button>
                        <div style={S.toolbarDivider} />

                        {/* Breadcrumb */}
                        <div style={S.breadcrumb}>
                            <span style={{ cursor: 'pointer', color: '#666' }} onClick={() => setFolder('all')}>Gallery</span>
                            {activeFolder !== 'all' && (<>
                                <span style={{ color: '#bbb' }}>›</span>
                                <span style={{ color: '#0A192F' }}>{activeFolderLabel}</span>
                            </>)}
                        </div>

                        {/* Search */}
                        <div style={S.searchBoxWrap}>
                            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', color: '#999' }}>⌕</span>
                            <input style={S.searchInput} placeholder="Search photos..." value={search} onChange={e => setSearch(e.target.value)} />
                            {search && <span style={{ cursor: 'pointer', color: '#999', fontSize: '0.75rem' }} onClick={() => setSearch('')}>✕</span>}
                        </div>
                    </div>

                    {/* ── Body ── */}
                    <div style={S.body}>

                        {/* ── Sidebar ── */}
                        <aside style={S.sidebar}>
                            <div style={S.sidebarSection}>Quick Access</div>
                            <div style={S.folderRow(activeFolder === 'all')} onClick={() => setFolder('all')}>
                                <span>🖼</span>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>All Photos</span>
                                <span style={S.folderBadge(activeFolder === 'all')}>{ALL_PHOTOS.length}</span>
                            </div>
                            <div style={S.sidebarDivider} />
                            <div style={S.sidebarSection}>Events</div>
                            {FOLDERS.map(f => {
                                const cnt = ALL_PHOTOS.filter(p => p.folderId === f.id).length;
                                const active = activeFolder === f.id;
                                return (
                                    <div key={f.id} style={S.folderRow(active)} onClick={() => setFolder(f.id)}>
                                        <span>📁</span>
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{f.label}</span>
                                        <span style={S.folderBadge(active)}>{cnt}</span>
                                    </div>
                                );
                            })}
                            <div style={{ marginTop: 'auto', padding: '0.75rem 1rem', borderTop: '1px solid #e0e0e0' }}>
                                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.58rem', color: '#bbb' }}>
                                    {ALL_PHOTOS.length} photos · {FOLDERS.length} events
                                </div>
                            </div>
                        </aside>

                        {/* ── Main Col ── */}
                        <div style={S.mainCol}>

                            {/* Filter bar — now includes Clear + Share icon buttons */}
                            <div style={S.filterBar}>
                                <span style={S.filterLabel}>Filter:</span>
                                <select style={S.filterSelect} value={filterClub} onChange={e => setFilterClub(e.target.value)}>
                                    {ALL_CLUBS.map(c => <option key={c}>{c}</option>)}
                                </select>
                                <select style={S.filterSelect} value={filterMonth} onChange={e => setFilterMonth(e.target.value)}>
                                    {ALL_MONTHS.map(m => <option key={m}>{m}</option>)}
                                </select>

                                {(filterClub !== 'All Clubs' || filterMonth !== 'All Dates' || search) && (
                                    <button
                                        style={{ border: '1.5px solid #ccc', background: '#fff', color: '#777', fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', padding: '0.2rem 0.65rem', cursor: 'pointer' }}
                                        onClick={() => { setFilterClub('All Clubs'); setFilterMonth('All Dates'); setSearch(''); }}
                                    >✕ Clear</button>
                                )}

                                <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
                                    {/* Clear selection — ✕ icon */}
                                    {sel.size > 0 && (
                                        <button
                                            style={S.iconBtn(false)}
                                            onClick={() => setSel(new Set())}
                                            title={`Clear ${sel.size} selected`}
                                        >✕</button>
                                    )}
                                    {/* Share — ↑ icon (shows count badge when selected) */}
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            style={{ ...S.iconBtn(sel.size > 0), opacity: sel.size > 0 ? 1 : 0.38, cursor: sel.size > 0 ? 'pointer' : 'default' }}
                                            onClick={() => sel.size > 0 && requireAuth('share photos', () => setShareOpen(true))}
                                            title={sel.size > 0 ? `Share ${sel.size} photo${sel.size > 1 ? 's' : ''}` : 'Select photos to share'}
                                        >↑</button>
                                        {sel.size > 0 && (
                                            <span style={{ position: 'absolute', top: -6, right: -6, background: '#0A192F', color: '#f7d000', border: '1.5px solid #f7d000', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 900, fontFamily: 'Space Mono, monospace', pointerEvents: 'none' }}>{sel.size}</span>
                                        )}
                                    </div>
                                    <div style={{ width: 1, height: 20, background: '#ccc' }} />
                                    <button style={S.viewToggle(viewMode === 'grid')} onClick={() => setViewMode('grid')} title="Grid view">⊞</button>
                                    <button style={S.viewToggle(viewMode === 'large')} onClick={() => setViewMode('large')} title="Large view">⊟</button>
                                </div>
                            </div>

                            {/* Grid */}
                            <div style={S.grid(viewMode === 'large')}>
                                {photos.length === 0 ? (
                                    <div style={S.emptyState}>
                                        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🗂</div>
                                        <div>No photos match your filters.</div>
                                        <button style={{ marginTop: '1rem', fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', border: '2px solid #ccc', padding: '0.3rem 1rem', cursor: 'pointer', background: '#fff', color: '#555' }} onClick={() => { setFilterClub('All Clubs'); setFilterMonth('All Dates'); setSearch(''); }}>Clear Filters</button>
                                    </div>
                                ) : photos.map((photo, idx) => {
                                    const selected = sel.has(photo.id);
                                    const hovered = hoveredId === photo.id;
                                    return (
                                        <div
                                            key={photo.id}
                                            style={S.card(selected, hovered)}
                                            onClick={() => openModal(photo, idx)}
                                            onMouseEnter={() => setHoveredId(photo.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                        >
                                            <div style={S.selectCircle(selected, hovered)} onClick={(e) => toggleSel(photo.id, e)} title={selected ? 'Deselect' : 'Select'}>
                                                {selected && '✓'}
                                            </div>
                                            <img src={photo.thumb} alt={photo.title} style={S.cardImg} loading="lazy" draggable={false} />
                                            <div style={S.cardCaption}>{photo.title}</div>
                                            <div style={S.cardMeta}>{photo.month} · {photo.club}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ── Status Bar ── */}
                    <div style={S.statusBar}>
                        <span>
                            {photos.length} item{photos.length !== 1 ? 's' : ''}
                            {sel.size > 0 && <span style={{ color: '#f7d000', marginLeft: '0.5rem' }}>· {sel.size} selected</span>}
                        </span>
                        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}>
                            {navbarHidden ? '▲ Click green button to restore navbar' : ''}
                        </span>
                    </div>

                </div>{/* /window */}
            </main>

            {modal && (
                <PhotoModal modal={modal} photos={photos} onClose={() => setModal(null)} onNavigate={gotoModal} onShare={() => requireAuth('share photos', () => setShareOpen(true))} />
            )}
            {shareOpen && shareTarget && (
                <ShareModal count={sel.size > 0 ? sel.size : 1} targetUrl={shareTarget.src} targetName={shareTarget.title} onClose={() => setShareOpen(false)} />
            )}
        </div>
    );
}
