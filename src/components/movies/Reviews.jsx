'use client';

import React from 'react';
import styled from 'styled-components';
import Stars from '@/components/movies/Stars';

const ReviewSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #777;
`;

const Reviews = ({ voteAverage, voteCount }) => {
  const ratingOutOfFive = voteAverage / 2;

  return (
    <ReviewSection>
      <Stars voteAverage={voteAverage} />
      <span>
        {ratingOutOfFive.toFixed(1)} • {voteCount} reviews
      </span>
    </ReviewSection>
  );
};

export default Reviews;
