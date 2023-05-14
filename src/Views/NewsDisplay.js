import React, { useContext, useEffect, useState, useCallback } from 'react';
import NewsContext from '../NewsContext';
import { fetchTopHeadlines, searchNews } from '../utils/newsAPI';
import Button from '@mui/material/Button';
import TopNews from '../components/TopNews';
import Categories from '../components/Categories';
import Search from '../components/Search';
import '../styles/NewsDisplay.css'

// Define the categories for the news display
const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

const NewsDisplay = () => {
  // Destructure relevant context values
  const {
    updateNewsItems,
    selectedCountry,
    updateSelectedCountry,
    updateSearchFilter,
    filteredNewsItems,
  } = useContext(NewsContext);

  // Define component state
  const [toggle, setToggle] = useState('Top News');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [newsWithImages, setNewsWithImages] = useState([]);
  const [newsWithoutImages, setNewsWithoutImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to fetch data based on toggle state and selected category
  const fetchData = useCallback(
    async (category) => {
      try {
        setIsRequesting(true);

        // Fetch data based on toggle state
        if (toggle === 'Top News') {
          const articles = await fetchTopHeadlines(selectedCountry);
          updateNewsItems(articles);
          updateSearchFilter('');
        } else if (toggle === 'Search') {
          const articles = await searchNews(selectedCountry, searchTerm);
          updateNewsItems(articles);
          updateSearchFilter(searchTerm);
        } else if (toggle === 'Categories' && (selectedCategory || category)) {
          const articles = await fetchTopHeadlines(
            selectedCountry,
            category || selectedCategory
          );
          updateNewsItems(articles);
          updateSearchFilter('');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsRequesting(false);
      }
    },
    [selectedCountry, searchTerm, selectedCategory, toggle, updateNewsItems, updateSearchFilter]
  );

  // Update newsWithImages and newsWithoutImages state when filteredNewsItems changes
  useEffect(() => {
    // Separate articles with and without images
    const articlesWithImages = filteredNewsItems.filter((newsItem) => newsItem.urlToImage);
    const articlesWithoutImages = filteredNewsItems.filter((newsItem) => !newsItem.urlToImage);

    setNewsWithImages(articlesWithImages);
    setNewsWithoutImages(articlesWithoutImages);
  }, [filteredNewsItems]);

  // Handlers for various user interactions
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

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setToggle('Categories');
    setSearchTerm('');
    updateSearchFilter('');
    fetchData(category);
  };

  // Render the NewsDisplay component
  return (
    <div className="news-display">
      {/* Navigation buttons and country selection */}
      <div className="header">
        <div className="left-section">
          {/* Button for toggling Top News display */}
          <Button
            variant={toggle === 'Top News' ? 'contained' : 'text'}
            onClick={() => handleToggle('Top News')}
          >
            Top News
          </Button>
          {/* Button for toggling Categories display */}
          <Button
            variant={toggle === 'Categories' ? 'contained' : 'text'}
            onClick={() => handleToggle('Categories')}
          >
            Categories
          </Button>
          {/* Button for toggling Search display */}
          <Button
            variant={toggle === 'Search' ? 'contained' : 'text'}
            onClick={() => handleToggle('Search')}
          >
            Search
          </Button>
        </div>
        <div className="right-section">
          {/* Button for selecting Great Britain (GB) */}
          <Button
            variant={selectedCountry === 'gb' ? 'contained' : 'text'}
            onClick={() => updateSelectedCountry('gb')}
          >
            GB
          </Button>
          {/* Button for selecting United States (US) */}
          <Button
            variant={selectedCountry === 'us' ? 'contained' : 'text'}
            onClick={() => updateSelectedCountry('us')}
          >
            US
          </Button>
        </div>
      </div>
      {/* Render the appropriate component based on the toggle state */}
      <div className="news-container">
        {toggle === 'Top News' &&
          < TopNews
            newsWithImages={newsWithImages}
            newsWithoutImages={newsWithoutImages}
          />}
        {toggle === 'Search' && (
          <Search
            newsWithImages={newsWithImages}
            newsWithoutImages={newsWithoutImages}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            selectedCountry={selectedCountry}
          />
        )}
        {toggle === 'Categories' && (
          < Categories
            categories={categories}
            selectedCategory={selectedCategory}
            newsWithImages={newsWithImages}
            newsWithoutImages={newsWithoutImages}
            handleCategorySelection={handleCategorySelection}
          />
        )}
      </div>
    </div>
  );
};

export default NewsDisplay;


