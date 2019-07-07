import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px 0 10px 20px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: inset 0px -1px 0 0 #ddd;
`;

export default function Header({ channelName }) {
  return <Wrapper>#{channelName}</Wrapper>;
}
