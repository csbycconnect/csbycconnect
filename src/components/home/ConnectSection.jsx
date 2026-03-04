import React from 'react';

export default function ConnectSection() {
    return (
        <section id="connect">
            <h2 className="section-title">Reach Out</h2>
            <div className="connect-container">
                <div className="connect-text">
                    <p>
                        Have an article idea, want to report an event on campus, or interested in joining the editorial team? Reach out to us.
                    </p>
                    <p style={{ marginTop: '1rem', fontStyle: 'italic', opacity: 0.8 }}>
                        We're always looking for sharp voices.
                    </p>
                </div>
                <form className="contact-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea rows="4" placeholder="Your thoughts..."></textarea>
                    </div>
                    <button type="submit" className="brutal-btn" style={{ alignSelf: 'flex-start' }}>Submit</button>
                </form>
            </div>
        </section>
    );
}
