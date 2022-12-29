import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const srcElement = screen.getByText(/src/i);
  expect(srcElement).toBeInTheDocument();
});
