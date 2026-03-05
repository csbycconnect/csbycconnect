import React, { createContext, useContext, useState } from 'react';

// ─── Dummy account ────────────────────────────────────────────────────────────
const DUMMY_USER = {
    name: 'Vishnu',
    email: 'vishnu@christuniversity.in',
    role: 'student',
    avatar: `https://api.dicebear.com/9.x/initials/svg?seed=Vishnu&backgroundColor=0A192F&textColor=f7d000`,
};

const SESSION_KEY = 'bb_auth_user';

function loadSession() {
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : DUMMY_USER; // pre-logged-in by default
    } catch {
        return DUMMY_USER;
    }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => loadSession());

    const login = (u = DUMMY_USER) => {
        const authed = u;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(authed));
        setUser(authed);
    };

    const logout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
