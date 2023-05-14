import React from 'react';
import { Button } from '@mui/material';

// The Categories component takes several props to render category buttons and news items
const Categories = ({
    categories, // Array of categories
    selectedCategory, // The currently selected category
    newsWithImages, // Array of news items that have images
    newsWithoutImages, // Array of news items that don't have images
    handleCategorySelection // Callback function for handling category selection
}) => {
    return (
        <> {/* Render category buttons */}
            <div className="categories-container">
                {/* Iterate over the categories array and create a button for each category */}
                {categories.map((category) => (
                    <Button
                        key={category}
                        // Set the button's variant based on whether the category is currently selected
                        variant={selectedCategory === category ? 'contained' : 'text'}
                        onClick={() => handleCategorySelection(category)}>
                        {category}
                    </Button>
                ))}
            </div>
            {/* Render news items */}
            <div className="news-row">
                {/* Render news items with images */}
                <div className="news-column">
                    {newsWithImages.map((newsItem) => (
                        <div className="news-item" key={newsItem.url}>
                            <h3>{newsItem.title}</h3>
                            {/* Show the image if available */}
                            <img src={newsItem.urlToImage} alt={newsItem.title} className="news-item-image" />
                            <p>{newsItem.description}</p>
                            {/* Link to the original news item */}
                            <a href={newsItem.url} target="_blank" rel="noopener noreferrer" className="news-item-more">
                                More <span>&gt;</span>
                            </a>
                        </div>
                    ))}
                </div>
                {/* Render news items without images */}
                <div className="news-column">
                    {newsWithoutImages.map((newsItem) => (
                        <div className="news-item" key={newsItem.url}>
                            <h3>{newsItem.title}</h3>
                            <p>{newsItem.description}</p>
                            {/* Link to the original news item */}
                            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                                More <span>&gt;</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default Categories;