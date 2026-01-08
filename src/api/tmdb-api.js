import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    // Vite projelerinde env değişkenlerine import.meta.env ile erişilir
    api_key: import.meta.env.VITE_API_KEY, 
  },
});

export const getTrendingMovies = async () => {
  const { data } = await api.get("/trending/movie/day");
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await api.get(`/search/movie`, {
    params: { query },
  });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}`);
  return data;
};

export const getMovieCast = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const getMovieReviews = async (movieId) => {
  const { data } = await api.get(`/movie/${movieId}/reviews`);
  return data.results;
};

export const getImageUrl = (path) => {
  return path
    ? `https://image.tmdb.org/t/p/w500/${path}`
    : "https://via.placeholder.com/500x750?text=No+Image";
};