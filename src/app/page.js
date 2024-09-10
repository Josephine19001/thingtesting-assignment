'use client';

import React, { Suspense, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
const MoviesList = React.lazy(() => import('@/components/movies/MoviesList'));
import LoadingComponent from '@/components/common/Loading';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 50%;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 24px;
  padding: 8px 16px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
  flex: 1;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <HeroContainer>
        <h1>Discover popular movies with honest reviews</h1>
        <SearchContainer>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Search by movie title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </HeroContainer>

      <Suspense fallback={<LoadingComponent />}>
        <MoviesList searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}
