import React from 'react';

// The Search component takes several props to render a search form and news items
const Search = (
    {
        newsWithImages, // Array of news items that have images
        newsWithoutImages, // Array of news items that don't have images
        searchTerm, // The current search term
        setSearchTerm, // Callback function for setting the search term
        handleSearch, // Callback function for handling the search form submission
        selectedCountry // The selected country for news articles
    }
) => {
    // Log the newsWithImages and newsWithoutImages arrays to the console
    console.log(newsWithImages, newsWithoutImages)
    return (
        <>
            {/* Render the search form */}
            <form onSubmit={handleSearch} className="search-form">
                <div>
                    {/* Display the selected country for news articles */}
                    <span>&#8226; Search Top News Articles in
                        {selectedCountry === 'gb' ? ' Great Britain: ' : ' United States: '}
                        <br /></span>
                    {/* Render an input field for the search term */}
                    <input
                        type="text"
                        value={searchTerm}
                        // Update the searchTerm state when the input value changes
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search term..."
                    />
                    {/* Render a search button */}
                    <button type="submit">Search</button>
                </div>
            </form>
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

export default Search;