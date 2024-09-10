import { useCallback, useState } from 'react';
import axios from 'axios';
import { MOVIES_BASE_API_URL, moviesParams } from '@/constants';

const usePopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPopularMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get(`${MOVIES_BASE_API_URL}/popular`, {
        params: moviesParams
      });
      const movies = response.data.results;
      setPopularMovies(movies);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getPopularMovies,
    error,
    loading,
    popularMovies
  };
};

export default usePopularMovies;
