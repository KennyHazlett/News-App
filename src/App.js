import React from 'react';
import { NewsProvider } from './NewsContext';
import NewsDisplay from './Views/NewsDisplay';
import ErrorBoundary from './ErrorBoundary';
import './styles/App.css';

// Main App component
const App = () => {
  return (
    <div className="App">
      {/* ErrorBoundary component wraps the application to catch and display any errors */}
      <ErrorBoundary>
        {/* NewsProvider component provides the NewsContext to child components */}
        <NewsProvider>
          {/* NewsDisplay component handles displaying the fetched news items */}
          <NewsDisplay />
        </NewsProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
