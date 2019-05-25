import React, { useState } from 'react';
import decode from 'jwt-decode';

import TeamList from '../components/TeamList';
import ChannelList from '../components/ChannelList';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

export default function Sidebar({ team, teams }) {
  const [isAddChannelModalOpened, setIsAddChannelModalOpened] = useState(false);
  const [isInviteModalOpened, setIsInviteModalOpened] = useState(false);
  let loggedInUser = '';
  try {
    const token = localStorage.getItem('token');
    const { username } = decode(token);
    loggedInUser = username;
  } catch (error) {}

  return (
    <>
      <TeamList teams={teams} />
      <ChannelList
        teamId={team.id}
        teamName={team.name}
        username={loggedInUser}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        handleAddChannel={() => setIsAddChannelModalOpened(true)}
        handleInvitePeople={() => setIsInviteModalOpened(true)}
      />
      <AddChannelModal
        teamId={team.id}
        isOpened={isAddChannelModalOpened}
        handleClose={e => {
          e.preventDefault();
          setIsAddChannelModalOpened(false);
        }}
      />
      <InvitePeopleModal
        teamId={team.id}
        isOpened={isInviteModalOpened}
        handleClose={e => {
          e.preventDefault();
          setIsInviteModalOpened(false);
        }}
      />
    </>
  );
}
