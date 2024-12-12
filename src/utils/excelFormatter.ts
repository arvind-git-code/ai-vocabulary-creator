import * as XLSX from 'xlsx';

export const formatGeminiResponseToExcel = (response: string) => {
  try {
    // Split response into lines and filter empty lines
    const lines = response.split('\n').filter(line => line.trim());
    
    // Convert text to structured data
    const data = lines.map(line => {
      // Remove common markdown/list markers
      const cleanLine = line.replace(/^[-*•\d.]+\s*/, '');
      
      // Split by common delimiters (comma, tab, pipe)
      const values = cleanLine.split(/[,|\t]+/).map(col => col.trim());
      
      // Return array of values directly
      return values;
    });

    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Convert array of arrays to worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Auto-size columns
    const colWidths = data.reduce((widths: number[], row) => {
      row.forEach((cell, index) => {
        const length = cell?.toString().length || 0;
        widths[index] = Math.max(widths[index] || 0, length);
      });
      return widths;
    }, []);

    ws['!cols'] = colWidths.map(width => ({ width: width + 2 }));

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Gemini Response');

    // Generate Excel file
    XLSX.writeFile(wb, 'gemini-response.xlsx');
  } catch (error) {
    console.error('Error formatting Excel:', error);
    throw new Error('Failed to format response as Excel');
  }
}; 