import React from 'react';
import styled from 'styled-components';

import TeamList from '../components/TeamList';
import ChannelList from '../components/ChannelList';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

export default function ViewTeam() {
  return (
    <Layout>
      <TeamList>Teams</TeamList>
      <ChannelList />
      <Header>Header</Header>
      <MessageList />
      <MessageInput />
    </Layout>
  );
}
