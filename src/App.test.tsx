import '@testing-library/jest-dom/extend-expect';
import { test, expect } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders English to Hindi Word Selector', () => {
  render(<App />);
  const headingElement = screen.getByText(/English to Hindi Word Selector/i);
 
});
