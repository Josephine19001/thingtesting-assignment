'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import Image from 'next/image';
import axios from 'axios';
import { FaAngleLeft } from 'react-icons/fa6';
import { IMAGE_BASE_URL, MOVIES_BASE_API_URL } from '@/constants';
import Reviews from '@/components/movies/Reviews';
import Loading from '@/components/common/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  gap: 48px;
  flex-wrap: wrap;

  margin-bottom: 24px;
`;

const Poster = styled(Image)`
  width: 500px;
  object-fit: cover;
  border-radius: 8px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Overview = styled.p`
  font-size: 16px;
  color: #444;
`;

const ScreenshotContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const Screenshot = styled(Image)`
  padding: 8px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const MovieDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [movie, setMovie] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `${MOVIES_BASE_API_URL}/movie/${movieId}`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY
          }
        }
      );
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchScreenshots = async (movieId) => {
    try {
      const response = await axios.get(
        `${MOVIES_BASE_API_URL}/movie/${movieId}/images`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY
          }
        }
      );
      setScreenshots(response.data.backdrops);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
      fetchScreenshots(id);
    }
  }, [id]);

  const goBackHome = () => {
    router.push('/');
  };

  if (loading) return <Loading />;
  if (error) return <p>Something went wrong</p>;

  if (!movie) return <p>Movie not found</p>;

  return (
    <Container>
      <div>
        <BackButton onClick={goBackHome}>
          <FaAngleLeft />
          <span>Back to home</span>
        </BackButton>
      </div>
      <Header>
        <Details>
          <Title>{movie.title}</Title>
          <Reviews
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count}
          />
          <Overview>{movie.overview}</Overview>
        </Details>
        <Poster
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt="poster"
          width={300}
          height={450}
        />
      </Header>
      <h2>Screenshots</h2>
      <ScreenshotContainer>
        {screenshots.map((screenshot, index) => (
          <Screenshot
            key={index}
            src={`${IMAGE_BASE_URL}${screenshot.file_path}`}
            alt={`screenshot-${index}`}
            width={150}
            height={100}
          />
        ))}
      </ScreenshotContainer>
    </Container>
  );
};

export default MovieDetail;
