import React from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import MessageList from '../components/MessageList';
import SendMessage from '../components/SendMessage';
import Sidebar from '../containers/Sidebar';

const Layout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

export default function ViewTeam({ match: { params } }) {
  return (
    <Layout>
      <Sidebar currentTeamId={params.teamId} />
      <Header channelName='general' />
      <MessageList />
      <SendMessage channelName='general' />
    </Layout>
  );
}
