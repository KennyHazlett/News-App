import { API_KEY } from './config';

const fetchTopHeadlines = async (country, category) => {
  try {
    const url = new URL('https://newsapi.org/v2/top-headlines');
    const params = { apiKey: API_KEY, country };

    if (category) {
      params.category = category;
    }

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const searchNews = async (country, query) => {
  try {
    const url = new URL('https://newsapi.org/v2/everything');
    const params = { apiKey: API_KEY, q: query, language: 'en', sortBy: 'relevance' };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { fetchTopHeadlines, searchNews };
