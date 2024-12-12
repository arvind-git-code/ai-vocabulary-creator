import React, { useState } from 'react';

interface SelectedWord {
  word: string;
}

interface TextSelectorProps {
  onWordSelect: React.Dispatch<React.SetStateAction<SelectedWord[]>>;
}

const TextSelector: React.FC<TextSelectorProps> = ({ onWordSelect }) => {
  const [text, setText] = useState('');
  const [selectedText, setSelectedText] = useState<string[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const clearSelection = () => {
    setSelectedText([]);
    onWordSelect([]);
  };

  const handleWordClick = (word: string) => {
    if (selectedText.includes(word)) {
      setSelectedText(prev => prev.filter(w => w !== word));
      onWordSelect(prev => prev.filter(item => item.word !== word));
    } else {
      setSelectedText(prev => [...prev, word]);
      onWordSelect(prev => [...prev, { word }]);
    }
  };

  return (
    <div className="text-selector">
      <h2>Input Text Section</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter or paste English text here..."
      />
      <div className="button-group">
        <button onClick={clearSelection} className="clear-button">
          Clear Selection
        </button>
      </div>
      <div className="words-container">
        {text.split(/\s+/).map((word, index) => (
          <span
            key={index}
            className={`word ${selectedText.includes(word) ? 'selected' : ''}`}
            onClick={() => handleWordClick(word)}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextSelector;
