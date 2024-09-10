'use client';

import React, { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { MOVIES_BASE_API_URL, moviesParams } from '@/constants';
import usePagination from '@/hooks/usePagination';

export const MoviesContext = createContext(undefined);

const MoviesProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    currentPage,
    totalPages,
    setTotalPages,
    goToNextPage,
    goToPreviousPage
  } = usePagination();

  const getPopularMovies = useCallback(
    async (page = 1) => {
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
        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [setTotalPages]
  );

  useEffect(() => {
    getPopularMovies(currentPage);
  }, [getPopularMovies, currentPage]);

  return (
    <MoviesContext.Provider
      value={{
        getPopularMovies,
        popularMovies,
        error,
        loading,
        currentPage,
        totalPages,
        goToNextPage,
        goToPreviousPage
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
