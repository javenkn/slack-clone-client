import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
`;

export default function MessageInput() {
  return (
    <Wrapper>
      Message Input
      <input type='text' placeholder='CSS Grid Layout Module' />
    </Wrapper>
  );
}
