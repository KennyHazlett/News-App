import { API_KEY } from './config';

const fetchTopHeadlines = async (country) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const searchNews = async (country, query) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=relevance&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { fetchTopHeadlines, searchNews };
