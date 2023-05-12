import React, { createContext, useState } from 'react';

const NewsContext = createContext();

export default NewsContext;

export const NewsProvider = ({ children }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('us'); // Default selected country is "us"
  const [searchFilter, setSearchFilter] = useState('');

  const updateNewsItems = (newItems) => {
    setNewsItems(newItems);
  };

  const updateSelectedCountry = (country) => {
    setSelectedCountry(country);
  };

  const updateSearchFilter = (filter) => {
    setSearchFilter(filter);
  };

  const contextValue = {
    newsItems,
    selectedCountry,
    searchFilter,
    updateNewsItems,
    updateSelectedCountry,
    updateSearchFilter,
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};
