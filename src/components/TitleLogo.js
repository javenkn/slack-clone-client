import React from 'react';
import { Image, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import logo from '../images/icon_slack_hash_colored.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  > h1 {
    margin: 0 0 0 10px !important;
  }
`;

export default function TitleLogo({ history }) {
  return (
    <Wrapper onClick={() => history.push('/')}>
      <Image src={logo} size='mini' inline />
      <Header as='h1' content='Slack Clone' />
    </Wrapper>
  );
}
