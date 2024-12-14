import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TextSelector from './components/TextSelector';
import GeminiChat from './components/GeminiChat';

interface SelectedWord {
  word: string;
}

function App() {
  const [selectedWords, setSelectedWords] = useState<SelectedWord[]>([]);
  const [geminiInput, setGeminiInput] = useState('');
  const selectedWordsText = selectedWords.map(w => w.word).join(', ');
  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';

  useEffect(() => {
    if (!GEMINI_API_KEY) {
      console.error('Gemini API key not found');
    }
  }, [GEMINI_API_KEY]);

  const handleGenerateWithAI = () => {
    if (!selectedWordsText) {
      alert('Please select some words first');
      return;
    }
    if (!GEMINI_API_KEY) {
      alert('API key not configured. Please check the setup.');
      return;
    }
    const prompt = `Please write the English and their three Hindi meaning side by side for these words:- ${selectedWordsText}`;
    setGeminiInput(prompt);
  };

  return (
    <div className="app-wrapper">
      <Header />
      <main className="app-container">
        <div className="main-section">
          <TextSelector onWordSelect={setSelectedWords} />
        </div>
        <div className="comma-separated-section">
          <h2>Selected Words</h2>
          <div className="selected-words-text">
            {selectedWordsText || 'No words selected'}
          </div>
          <button 
            onClick={handleGenerateWithAI} 
            className="generate-ai-button"
            disabled={!selectedWordsText}
          >
            Generate Excel File
          </button>
        </div>
        <GeminiChat apiKey={GEMINI_API_KEY} initialInput={geminiInput} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
