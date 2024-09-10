'use client';

import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled(AiOutlineLoading3Quarters)`
  animation: ${rotate} 1s linear infinite;
  font-size: 48px;
`;

const LoadingText = styled.span`
  margin-top: 16px;
  font-size: 14px;
`;

import React from 'react';

function Loading() {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Fetching movies...</LoadingText>
    </LoadingContainer>
  );
}

export default Loading;
