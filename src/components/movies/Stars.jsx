'use client';

import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import styled from 'styled-components';

const StarsContainer = styled.div`
  display: flex;
  gap: 4px;
  color: #ffcc00;
`;

const renderStars = (score) => {
  const clampedScore = Math.max(0, Math.min(score, 5));
  const fullStars = Math.floor(clampedScore);
  const halfStars = clampedScore % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <>
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar key={`full-${index}`} />
      ))}
      {halfStars === 1 && <FaStarHalfAlt key="half" />}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar key={`empty-${index}`} />
      ))}
    </>
  );
};

const Stars = ({ voteAverage }) => {
  const ratingOutOfFive = voteAverage / 2;

  return <StarsContainer>{renderStars(ratingOutOfFive)}</StarsContainer>;
};

export default Stars;
