import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 2;
`;

export default function MessageList() {
  return (
    <Wrapper>
      Messages
      <ul class='message-list'>
        <li />
        <li />
      </ul>
    </Wrapper>
  );
}
