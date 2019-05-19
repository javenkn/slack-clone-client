import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

export default function Layout() {
  return <Wrapper />;
}
