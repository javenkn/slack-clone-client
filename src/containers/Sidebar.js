import React, { useState } from 'react';

import TeamList from '../components/TeamList';
import ChannelList from '../components/ChannelList';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

export default function Sidebar({ team, teams, username }) {
  const [isAddChannelModalOpened, setIsAddChannelModalOpened] = useState(false);
  const [isInviteModalOpened, setIsInviteModalOpened] = useState(false);

  return (
    <>
      <TeamList teams={teams} />
      <ChannelList
        teamId={team.id}
        teamName={team.name}
        username={username}
        channels={team.channels}
        isAdmin={team.admin}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        handleAddChannel={() => setIsAddChannelModalOpened(true)}
        handleInvitePeople={() => setIsInviteModalOpened(true)}
      />
      <AddChannelModal
        teamId={team.id}
        isOpened={isAddChannelModalOpened}
        handleClose={e => {
          if (e) e.preventDefault();
          setIsAddChannelModalOpened(false);
        }}
      />
      <InvitePeopleModal
        teamId={team.id}
        isOpened={isInviteModalOpened}
        handleClose={e => {
          if (e) e.preventDefault();
          setIsInviteModalOpened(false);
        }}
      />
    </>
  );
}
