const API_URL = 'https://api.mymemory.translated.net/get';

export const translateToHindi = async (text: string): Promise<string> => {
  try {
    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(text)}&langpair=en|hi`
    );

    const data = await response.json();
    
    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails);
    }

    return data.responseData.translatedText || 'अनुवाद उपलब्ध नहीं है';
  } catch (error) {
    console.error('Translation error:', error);
    return 'अनुवाद त्रुटि';
  }
}; 