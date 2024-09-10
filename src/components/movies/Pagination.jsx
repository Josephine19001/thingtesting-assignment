'use client';

import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #ddd;
`;

const PaginationButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #42d1f5;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #227387;
  }

  &:disabled {
    background-color: #ccc;
    color: #999;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

const Pagination = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage
}) => {
  return (
    <PaginationContainer>
      <PaginationButton onClick={goToPreviousPage} disabled={currentPage === 1}>
        Previous
      </PaginationButton>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <PaginationButton
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;

/**
 *  <div>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
 */
