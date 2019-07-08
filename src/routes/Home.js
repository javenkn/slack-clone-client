import React from 'react';
import styled from 'styled-components';
import { Header, List, Button, Icon } from 'semantic-ui-react';
import HomeLayout from '../components/HomeLayout';

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
    <HomeLayout
      history={props.history}
      navButton={
        <PurpleButton onClick={() => props.history.push('/login')} size='large'>
          Login
        </PurpleButton>
      }
    >
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
    </HomeLayout>
  );
}
