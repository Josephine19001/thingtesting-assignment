'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { IMAGE_BASE_URL } from '@/constants';
import Reviews from '@/components/movies/Reviews';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;

  cursor: pointer;

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
    transition: all 0.6s;
  }
`;

const Poster = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const Title = styled.h2`
  font-size: 18px;
`;

const ReviewSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #777;
`;

const Overview = styled.p`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #444;
`;

const ListItem = ({
  posterPath,
  overview,
  voteAverage,
  voteCount,
  title,
  id
}) => {
  const router = useRouter();

  const goToDetails = () => {
    router.push(`/movies/${encodeURIComponent(title)}?id=${id}`);
  };

  return (
    <Container onClick={goToDetails}>
      <Poster
        src={`${IMAGE_BASE_URL}${posterPath}`}
        alt="movie poster"
        width={500}
        height={200}
        priority
      />
      <Title>{title}</Title>
      <Reviews voteAverage={voteAverage} voteCount={voteCount} />
      <Overview>{overview}</Overview>
    </Container>
  );
};

export default ListItem;
