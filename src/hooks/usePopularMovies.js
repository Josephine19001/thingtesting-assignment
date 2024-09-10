import { useCallback, useState } from 'react';
import axios from 'axios';
import { MOVIES_BASE_API_URL, moviesParams } from '@/constants';

const usePopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);

  const getPopularMovies = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(false);

      const response = await axios.get(`${MOVIES_BASE_API_URL}/popular`, {
        params: {
          ...moviesParams,
          page
        }
      });
      const movies = response.data.results;

      setPopularMovies(movies);
      setCurrentPage(page);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const goToNextPage = () => {
    if (currentPage < totalPages) getPopularMovies(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) getPopularMovies(currentPage - 1);
  };

  return {
    getPopularMovies,
    error,
    loading,
    popularMovies,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage
  };
};

export default usePopularMovies;
