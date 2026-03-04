import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import ByteboardLoader from './components/shared/ByteboardLoader';

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {/* Website always rendered underneath */}
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogs" element={<Blogs />} />
                </Routes>
            </Router>

            {/* Loader overlaid on top — fades out to reveal the site behind */}
            {loading && <ByteboardLoader onComplete={() => setLoading(false)} />}
        </>
    );
}

export default App;
