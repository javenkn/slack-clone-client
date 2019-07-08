import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Header,
  Image,
  List,
  Button,
  Icon,
} from 'semantic-ui-react';

import logo from '../images/icon_slack_hash_colored.svg';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  h1 {
    margin: 0 0 0 10px !important;
  }
`;

const StyledContainer = styled(Container)`
  &&& {
    margin-top: 5%;
  }
`;

const StyledList = styled(List)`
  &&& {
    margin: 2% 0 5%;
  }
`;

const PurpleButton = styled(Button)`
  &&& {
    background: #611f69;
    color: #fff;
    &:hover {
      background-color: #4a154b;
    }
  }
`;

export default function Home(props) {
  return (
    <div>
      <HeaderWrapper>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={logo} size='mini' inline />
          <Header as='h1' content='Slack Clone' />
        </div>
        <PurpleButton onClick={() => props.history.push('/login')}>
          Login
        </PurpleButton>
      </HeaderWrapper>
      <StyledContainer text textAlign='center'>
        <Header as='h1' content='Slack but with less features 😅.' />
        <Header as='h3' content='Some of these features include:' />
        <StyledList bulleted>
          <List.Item>Creating a team</List.Item>
          <List.Item>Direct messaging</List.Item>
          <List.Item>Group messaging</List.Item>
          <List.Item>Image, Video, Text, and Audio upload</List.Item>
        </StyledList>
        <PurpleButton
          primary
          size='huge'
          onClick={() => props.history.push('/register')}
        >
          Register
          <Icon name='right arrow' />
        </PurpleButton>
      </StyledContainer>
    </div>
  );
}
