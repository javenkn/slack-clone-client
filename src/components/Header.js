import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

export default function Header({ channelName }) {
  return <Wrapper>#{channelName}</Wrapper>;
}
