import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #4e3a4c;
`;

export default function ChannelList() {
  return <Wrapper>Channels</Wrapper>;
}
