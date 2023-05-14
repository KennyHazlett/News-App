import React from 'react';

// The TopNews component takes two props to render news items
const TopNews = (
    {
        newsWithImages, // Array of news items that have images
        newsWithoutImages // Array of news items that don't have images
    }
) => {
    return (
        // Render news items in a two-column layout
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
    )
};

export default TopNews;