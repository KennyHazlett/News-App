import { render, screen } from '@testing-library/react';
import App from './App';

// Test to check if the "learn react" link is rendered correctly in the App component
test('renders learn react link', () => {
  // Render the App component
  render(<App />);

  // Find the link element with the text "learn react" (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);

  // Check if the link element is in the document
  expect(linkElement).toBeInTheDocument();
});
