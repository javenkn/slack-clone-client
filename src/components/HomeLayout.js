import React from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

import TitleLogo from '../components/TitleLogo';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background: #fff;
  > button {
    margin: 20px !important;
  }
`;

const HomeWrapper = styled.div`
  background: rgb(248, 248, 248);
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled(Container)`
  &&& {
    background: #fff;
    margin-top: 5%;
    padding: 3%;
    border-radius: 16px;
  }
`;

export default function HomeLayout({ history, children, navButton }) {
  return (
    <HomeWrapper>
      <HeaderWrapper>
        <TitleLogo history={history} />
        {navButton}
      </HeaderWrapper>
      <StyledContainer text textAlign='center'>
        {children}
      </StyledContainer>
    </HomeWrapper>
  );
}
