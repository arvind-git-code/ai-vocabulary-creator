import React, { useState, useEffect } from 'react';
import { formatGeminiResponseToExcel } from '../utils/excelFormatter';

interface GeminiChatProps {
  apiKey: string;
  initialInput?: string;
}

const GeminiChat: React.FC<GeminiChatProps> = ({ apiKey, initialInput = '' }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGeminiResponse = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: text
              }]
            }]
          })
        }
      );

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      setResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error getting response from Gemini: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await fetchGeminiResponse(input);
    }
  };

  useEffect(() => {
    if (initialInput) {
      fetchGeminiResponse(initialInput);
    }
  }, [initialInput]);

  const handleExportExcel = () => {
    try {
      formatGeminiResponseToExcel(response);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export to Excel. Please check the response format.');
    }
  };

  return (
    <div className="gemini-chat">
      <h2>Ask Anything with Gemini</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything... (For Excel export, ask for structured data)"
          className="gemini-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()} 
          className="gemini-button"
        >
          {loading ? <span className="loading-dots">Thinking</span> : 'Send'}
        </button>
      </form>
      {response && (
        <div className="gemini-response">
          <h3>Generated Data</h3>
          <div className="response-text">{response}</div>
          <button 
            onClick={handleExportExcel}
            className="gemini-button export-excel"
          >
            Export to Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default GeminiChat; 