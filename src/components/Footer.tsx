import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <p>A tool for generating English-Hindi vocabulary with AI assistance</p>
        </div>
        <div className="footer-section">
          <h3>Developer</h3>
          <p>Arvind Maurya</p>
        </div>
        <div className="footer-section">
          <h3>Powered By</h3>
          <div className="tech-stack">
            <span>React</span>
            <span>TypeScript</span>
            <span>Gemini AI</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Arvind Maurya. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer; 