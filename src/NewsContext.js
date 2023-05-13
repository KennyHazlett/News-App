import React, { createContext, useState, useEffect } from 'react';
import { fetchTopHeadlines, searchNews } from './newsAPI';

const NewsContext = createContext();

export default NewsContext;

export const NewsProvider = ({ children }) => {
  const [newsItems, setNewsItems] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('gb'); // Default selected country is "gb"
  const [searchFilter, setSearchFilter] = useState('');
  const [filteredNewsItems, setFilteredNewsItems] = useState([]);

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

  useEffect(() => {
    const filterNewsItems = () => {
      const filteredItems = newsItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
          item.description.toLowerCase().includes(searchFilter.toLowerCase())
      );
      setFilteredNewsItems(filteredItems);
    };

    filterNewsItems();
  }, [newsItems, searchFilter]);

  const updateSelectedCountry = (country) => {
    setSelectedCountry(country);
  };

  const updateSearchFilter = (filter) => {
    setSearchFilter(filter);
  };

  const searchArticles = async (country, query) => {
    try {
      const articles = await searchNews(country, query);
      setNewsItems(articles);
    } catch (error) {
      console.log(error);
      setNewsItems([]);
    }
  };

  const contextValue = {
    newsItems,
    selectedCountry,
    searchFilter,
    updateSelectedCountry,
    updateSearchFilter,
    filteredNewsItems,
    searchArticles
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};
