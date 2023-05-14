import { createContext, useState, useEffect } from 'react';
import { fetchTopHeadlines } from './utils/newsAPI';

const NewsContext = createContext();

export default NewsContext;

// NewsProvider component serves as a wrapper to manage the state and logic
// related to fetching and filtering news items.
export const NewsProvider = ({ children }) => {
  // State variables for news items, selected country, search filter and filtered news items
  const [newsItems, setNewsItems] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('gb'); // Default selected country is "gb"
  const [searchFilter, setSearchFilter] = useState('');
  const [filteredNewsItems, setFilteredNewsItems] = useState([]);

  // useEffect to fetch news based on the selected country
  useEffect(() => {
    const fetchData = async () => {
      try {
        let articles;

        if (selectedCountry === 'us') {
          articles = await fetchTopHeadlines('us');
        } else if (selectedCountry === 'gb') {
          articles = await fetchTopHeadlines('gb');
        }

        setNewsItems(articles);
      } catch (error) {
        console.log(error);
        setNewsItems([]);
      }
    };

    fetchData();
  }, [selectedCountry]);

  // useEffect to filter news items based on the search filter
  useEffect(() => {
    const filterNewsItems = () => {
      const filteredItems = newsItems.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(searchFilter.toLowerCase())) ||
          (item.description && item.description.toLowerCase().includes(searchFilter.toLowerCase()))
      );
      setFilteredNewsItems(filteredItems);
    };

    filterNewsItems();
  }, [newsItems, searchFilter]);

  // Functions to update selected country, search filter, and news items
  const updateSelectedCountry = (country) => {
    setSelectedCountry(country);
  };

  const updateSearchFilter = (filter) => {
    setSearchFilter(filter);
  };

  const updateNewsItems = (articles) => {
    setNewsItems(articles);
  };

  // Context value containing state variables and update functions
  const contextValue = {
    newsItems,
    selectedCountry,
    searchFilter,
    updateSelectedCountry,
    updateSearchFilter,
    filteredNewsItems,
    updateNewsItems,
  };

  // Providing the context value to children components
  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};
