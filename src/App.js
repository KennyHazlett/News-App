import React from 'react';
import { NewsProvider } from './NewsContext';
import NewsDisplay from './NewsDisplay';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <NewsProvider>
          <NewsDisplay />
        </NewsProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
