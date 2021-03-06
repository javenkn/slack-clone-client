import React, { useState } from 'react';

import TeamList from '../components/TeamList';
import ChannelList from '../components/ChannelList';
import AddChannelModal from '../components/modals/AddChannel';
import DirectMessageModal from '../components/modals/DirectMessage';
import InvitePeopleModal from '../components/modals/InvitePeople';

export default function Sidebar({ team, teams, username, currentUserId }) {
  const [isAddChannelModalOpened, setIsAddChannelModalOpened] = useState(false);
  const [isDirectMessageModalOpened, setIsDirectMessageModalOpened] = useState(
    false,
  );
  const [isInviteModalOpened, setIsInviteModalOpened] = useState(false);

  const handleModalToggle = (e, openFn) => {
    if (e) e.preventDefault();
    return openFn;
  };

  const channels = team.channels.filter(channel => !channel.dm);
  const directMessages = team.channels.filter(channel => channel.dm);

  return (
    <>
      <TeamList teams={teams} />
      <ChannelList
        teamId={team.id}
        teamName={team.name}
        username={username}
        channels={channels}
        isAdmin={team.admin}
        directMessages={directMessages}
        handleAddChannel={() => setIsAddChannelModalOpened(true)}
        handleDirectMessage={() => setIsDirectMessageModalOpened(true)}
        handleInvitePeople={() => setIsInviteModalOpened(true)}
      />
      <AddChannelModal
        teamId={team.id}
        isOpened={isAddChannelModalOpened}
        handleClose={e =>
          handleModalToggle(e, setIsAddChannelModalOpened(false))
        }
        currentUserId={currentUserId}
      />
      <DirectMessageModal
        teamId={team.id}
        isOpened={isDirectMessageModalOpened}
        handleClose={e =>
          handleModalToggle(e, setIsDirectMessageModalOpened(false))
        }
        currentUserId={currentUserId}
      />
      <InvitePeopleModal
        teamId={team.id}
        isOpened={isInviteModalOpened}
        handleClose={e => handleModalToggle(e, setIsInviteModalOpened(false))}
      />
    </>
  );
}
