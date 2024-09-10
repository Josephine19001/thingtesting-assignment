import { useState } from 'react';

const usePagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const resetPagination = () => {
    setCurrentPage(1);
    setTotalPages(0);
  };

  return {
    currentPage,
    totalPages,
    setTotalPages,
    goToNextPage,
    goToPreviousPage,
    resetPagination
  };
};

export default usePagination;
