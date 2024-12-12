import React from 'react';
import * as XLSX from 'xlsx';

interface SelectedWord {
  word: string;
  translation: string;
}

interface PreviewSectionProps {
  selectedWords: SelectedWord[];
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ selectedWords }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedWords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Words');
    XLSX.writeFile(workbook, 'selected-words.xlsx');
  };

  return (
    <div className="preview-section">
      <h2>Preview Section</h2>
      <div className="selected-words">
        {selectedWords.map((item, index) => (
          <div key={index} className="word-item">
            <span>{item.word}</span>
            <span>{item.translation}</span>
          </div>
        ))}
      </div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default PreviewSection;