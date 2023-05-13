import React, { useContext, useEffect, useState } from 'react';
import NewsContext from './NewsContext';
import { fetchTopHeadlines, searchNews } from './newsAPI';
import './NewsDisplay.css';
import Button from '@mui/material/Button';

const NewsDisplay = () => {
  const {
    updateNewsItems,
    selectedCountry,
    updateSelectedCountry,
    updateSearchFilter,
    filteredNewsItems,
  } = useContext(NewsContext);
  const [toggle, setToggle] = useState('Top News');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [newsWithImages, setNewsWithImages] = useState([]);
  const [newsWithoutImages, setNewsWithoutImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsRequesting(true);

        if (toggle === 'Top News') {
          const articles = await fetchTopHeadlines(selectedCountry);
          updateNewsItems(articles);
        } else if (toggle === 'Search') {
          const articles = await searchNews(selectedCountry, debouncedSearchTerm);
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

  useEffect(() => {
    // Separate articles with and without images
    const articlesWithImages = filteredNewsItems.filter((newsItem) => newsItem.urlToImage);
    const articlesWithoutImages = filteredNewsItems.filter((newsItem) => !newsItem.urlToImage);

    setNewsWithImages(articlesWithImages);
    setNewsWithoutImages(articlesWithoutImages);
  }, [filteredNewsItems]);

  const handleToggle = (option) => {
    if (!isRequesting) {
      setToggle(option);
      setSearchTerm('');
      updateSearchFilter('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isRequesting) {
      setToggle('Search');
      updateSearchFilter(searchTerm);
    }
  };

  return (
    <div className="news-display">
      <div className="header">
        <div className="left-section">
          <Button
            variant={toggle === 'Top News' ? 'contained' : 'text'}
            onClick={() => handleToggle('Top News')}
          >
            Top News
          </Button>
          <Button
            variant={toggle === 'Categories' ? 'contained' : 'text'}
            onClick={() => handleToggle('Categories')}
          >
            Categories
          </Button>
          <Button
            variant={toggle === 'Search' ? 'contained' : 'text'}
            onClick={() => handleToggle('Search')}
          >
            Search
          </Button>
        </div>
        <div className="right-section">
          <Button
            variant={selectedCountry === 'gb' ? 'contained' : 'text'}
            onClick={() => updateSelectedCountry('gb')}
          >
            GB
          </Button>
          <Button
            variant={selectedCountry === 'us' ? 'contained' : 'text'}
            onClick={() => updateSelectedCountry('us')}
          >
            US
          </Button>
        </div>
      </div>
      <div className="news-container">
        {toggle === 'Top News' && (
          <div className="news-row">
            <div className="news-column">
              {newsWithImages.map((newsItem) => (
                <div className="news-item" key={newsItem.url}>
                  <h3>{newsItem.title}</h3>
                  <img src={newsItem.urlToImage} alt={newsItem.title} className="news-item-image" />
                  <p>{newsItem.description}</p>
                  <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                    More <span>&gt;</span>
                  </a>
                </div>
              ))}
            </div>
            <div className="news-column">
              {newsWithoutImages.map((newsItem) => (
                <div className="news-item" key={newsItem.url}>
                  <h3>{newsItem.title}</h3>
                  <p>{newsItem.description}</p>
                  <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                    More <span>&gt;</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
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
            <div className="news-row">
              {filteredNewsItems.slice(0, 6).map((newsItem) => (
                <div className="news-item" key={newsItem.url}>
                  <h3>{newsItem.title}</h3>
                  {newsItem.urlToImage && (
                    <img src={newsItem.urlToImage} alt={newsItem.title} />
                  )}
                  <p>{newsItem.description}</p>
                  <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                    More <span>&gt;</span>
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsDisplay;
