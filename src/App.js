import React from 'react';
import { NewsProvider } from './NewsContext';
import NewsDisplay from './NewsDisplay';


const App = () => {
  return (
    <NewsProvider>
      <div className="App">
        <NewsDisplay />
      </div>
    </NewsProvider>
  );
};

export default App;
