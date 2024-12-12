import React from 'react';
import TranslateLogo from '../assets/translate-logo';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <TranslateLogo />
          <h1>English to Hindi Vocabulary Generator</h1>
        </div>
        <div className="powered-by">
          <span>Powered by</span>
          <span className="gemini-text">Google Gemini</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 