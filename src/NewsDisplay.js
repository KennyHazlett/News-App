import React, { useContext, useEffect, useState } from 'react';
import NewsContext from './NewsContext';
import { fetchTopHeadlines, searchNews } from './newsAPI';
import './NewsDisplay.css';

const NewsDisplay = () => {
  const { newsItems, updateNewsItems, selectedCountry } = useContext(NewsContext);
  const [toggle, setToggle] = useState('Top News');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsRequesting(true);

        if (toggle === 'Top News') {
          const articles = await fetchTopHeadlines(selectedCountry === 'gb' ? 'gb' : 'us');
          updateNewsItems(articles);
        } else if (toggle === 'Search') {
          const articles = await searchNews(selectedCountry === 'gb' ? 'gb' : 'us', debouncedSearchTerm);
          updateNewsItems(articles);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsRequesting(false);
      }
    };

    fetchData();
  }, [toggle, selectedCountry, debouncedSearchTerm, updateNewsItems]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Delay the execution by 500 milliseconds

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  const handleToggle = (option) => {
    if (!isRequesting) {
      setToggle(option);
      setSearchTerm('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isRequesting) {
      setToggle('Search');
    }
  };

  return (
    <div className="news-display">
      <div className="header">
        <div className="left-section">
          <button
            className={toggle === 'Top News' ? 'active' : ''}
            onClick={() => handleToggle('Top News')}
          >
            Top News
          </button>
          <button
            className={toggle === 'Categories' ? 'active' : ''}
            onClick={() => handleToggle('Categories')}
          >
            Categories
          </button>
          <button
            className={toggle === 'Search' ? 'active' : ''}
            onClick={() => handleToggle('Search')}
          >
            Search
          </button>
        </div>
        <div className="right-section">
          <button
            className={`${
              selectedCountry === 'gb' ? 'active' : ''
            }`}
            onClick={() => updateNewsItems('gb')}
          >
            GB
          </button>
          <button
            className={`${
              selectedCountry === 'us' ? 'active' : ''
            }`}
            onClick={() => updateNewsItems('us')}
          >
            US
          </button>
          </div>
      </div>
      <div className="news-container">
        {toggle === 'Top News' &&
          newsItems.map((newsItem) => (
            <div className="news-item" key={newsItem.id}>
              <h3>{newsItem.title}</h3>
              <p>{newsItem.description}</p>
              <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                More <span>&gt;</span>
              </a>
            </div>
          ))}
        {toggle === 'Search' && (
          <>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search term..."
              />
              <button type="submit">Search</button>
            </form>
            {newsItems.slice(0, 2).map((newsItem) => (
              <div className="news-item" key={newsItem.id}>
                                <h3>{newsItem.title}</h3>
                <p>{newsItem.description}</p>
                <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                  More <span>&gt;</span>
                </a>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsDisplay;

