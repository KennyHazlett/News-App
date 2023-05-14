// Store the API key from environment variables
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

// Function to fetch the top headlines from the News API based on country and category
const fetchTopHeadlines = async (country, category) => {
  try {
    // Construct the API request URL
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;
    // If a category is provided, add it to the URL
    if (category) {
      url += `&category=${category}`;
    }
    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();
    // If the response is not ok, throw an error with the message from the API
    if (!response.ok) {
      throw new Error(data.message);
    }
    // Return the array of news articles
    return data.articles;
  } catch (error) {
    console.log(error);
    // Return an empty array if an error occurs
    return [];
  }
};

// Function to search news articles by term, not implemented as wireframe shows only searching top headlines (accomplished by filter)
const searchNews = async (country, query) => {
  try {
    // Construct the API request URL for searching news articles
    const url = new URL('https://newsapi.org/v2/everything');
    const params = { apiKey: API_KEY, q: query, language: 'en', sortBy: 'relevance' };

    // Append search parameters to the URL
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();
    // Return the array of news articles
    return data.articles;
  } catch (error) {
    console.log(error);
    // Return an empty array if an error occurs
    return [];
  }
};

// Export the fetchTopHeadlines and searchNews functions
export { fetchTopHeadlines, searchNews };
