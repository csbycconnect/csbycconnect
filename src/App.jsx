import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Events from './pages/Events';
import Calendar from './pages/Calendar';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import WriteForUs from './pages/WriteForUs';
import ByteboardLoader from './components/shared/ByteboardLoader';
import GlobalBackground from './components/layout/GlobalBackground';

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {/* Fixed full-viewport animated background — z-index 0, pointer-events none */}
            <GlobalBackground />

            {/* Website always rendered underneath */}
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/write-for-us" element={<WriteForUs />} />
                </Routes>
            </Router>

            {/* Loader overlaid on top — fades out to reveal the site behind */}
            {loading && <ByteboardLoader onComplete={() => setLoading(false)} />}
        </>
    );
}

export default App;
