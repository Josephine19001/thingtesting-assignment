'use client';

import React, { useMemo, useState } from 'react';
import { useMovies } from '@/hooks/useMovies';
import styled from 'styled-components';
import Loading from '../common/Loading';
import Error from '../common/Error';
import ListItem from './ListItem';
import Pagination from './Pagination';

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 32px;
`;

const GenreFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const GenreButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => (props.selected ? '#000' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#000')};
  border: 0.5px solid #999;
  border-radius: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.selected ? '#fff' : '#333')};
    color: ${(props) => (props.selected ? '#333' : '#fff')};
  }
`;

export default function MoviesList({ searchTerm }) {
  const {
    popularMovies,
    genres,
    error,
    loading,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage
  } = useMovies();

  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genreId) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genreId)
        ? prevSelectedGenres.filter((id) => id !== genreId)
        : [...prevSelectedGenres, genreId]
    );
  };

  const filteredMovies = useMemo(() => {
    return popularMovies.filter((movie) => {
      const matchesTitle = movie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGenres =
        selectedGenres.length === 0 ||
        movie.genre_ids.some((genreId) => selectedGenres.includes(genreId));
      return matchesTitle && matchesGenres;
    });
  }, [popularMovies, searchTerm, selectedGenres]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <GenreFilterContainer>
        {genres.map((genre) => (
          <GenreButton
            key={genre.id}
            selected={selectedGenres.includes(genre.id)}
            onClick={() => toggleGenre(genre.id)}
          >
            {genre.name}
          </GenreButton>
        ))}
      </GenreFilterContainer>

      <MoviesContainer>
        {filteredMovies.length === 0 && (
          <div>
            <span>No movies found with the selected filters 😢</span>
          </div>
        )}
        {filteredMovies.length > 0 &&
          filteredMovies.map((movie) => (
            <ListItem
              key={movie.id}
              id={movie.id}
              posterPath={movie.poster_path}
              overview={movie.overview}
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
              title={movie.title}
            />
          ))}
      </MoviesContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />
    </div>
  );
}
