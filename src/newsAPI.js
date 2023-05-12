import axios from 'axios';

const API_KEY = 'ead89d7ec3f04f3b9272914c6cb860a3'; 

const fetchTopHeadlines = async (country) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`
    );
    return response.data.articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const searchNews = async (country, query) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${API_KEY}`
    );
    return response.data.articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { fetchTopHeadlines, searchNews };
