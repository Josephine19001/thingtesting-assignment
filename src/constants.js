export const MOVIES_BASE_API_URL = 'https://api.themoviedb.org/3/movie';
export const MOVIES_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
export const moviesParams = {
  api_key: MOVIES_API_KEY,
  language: 'en-US'
};
