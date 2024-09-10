'use client';

import React from 'react';
import { MdOutlineErrorOutline } from 'react-icons/md';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  span {
    color: red;
  }
`;

function Error() {
  return (
    <Container>
      <MdOutlineErrorOutline size={100} />
      <span>Something error occured while movies!</span>
    </Container>
  );
}

export default Error;
