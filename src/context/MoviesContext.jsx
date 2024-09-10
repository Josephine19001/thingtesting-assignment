'use client';

import React, { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { MOVIES_BASE_API_URL, moviesParams } from '@/constants';
import usePagination from '@/hooks/usePagination';

export const MoviesContext = createContext(undefined);

const MoviesProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    currentPage,
    totalPages,
    setTotalPages,
    goToNextPage,
    goToPreviousPage
  } = usePagination();

  const fetchPopularMovies = useCallback(
    async (page = 1) => {
      try {
        const response = await axios.get(
          `${MOVIES_BASE_API_URL}/movie/popular`,
          {
            params: {
              ...moviesParams,
              page
            }
          }
        );
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

  const fetchGenres = useCallback(async () => {
    try {
      const response = await axios.get(
        `${MOVIES_BASE_API_URL}/genre/movie/list`,
        {
          params: moviesParams
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  }, []);

  useEffect(() => {
    fetchPopularMovies(currentPage);
    fetchGenres();
  }, [fetchPopularMovies, fetchGenres, currentPage]);

  console.log('genres:', genres);
  return (
    <MoviesContext.Provider
      value={{
        fetchPopularMovies,
        popularMovies,
        error,
        loading,
        currentPage,
        totalPages,
        genres,
        fetchGenres,
        goToNextPage,
        goToPreviousPage
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
