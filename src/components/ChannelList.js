import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import Bubble from './Bubble';

const SectionTitle = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  div {
    width: 100%;
  }
  div,
  i {
    :hover {
      color: #fff;
    }
  }
`;

const Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  background-color: #4e3a4c;
  color: rgba(193, 197, 202, 0.64);
  padding: 10px 0;
  overflow-y: overlay;
`;

const paddingStyle = `padding: 4px 12px 4px 15px;`;

const HeaderArea = styled.div`
  ${paddingStyle};
  h1 {
    font-size: 20px;
    color: #fff;
  }
`;

const SectionWrapper = styled.section`
  ul {
    width: 100%;
    list-style: none;
    padding: 0;

    li {
      ${paddingStyle};
    }
  }
`;

const ListItemWrapper = styled.li`
  cursor: pointer;
  color: rgba(193, 197, 202, 0.64);
  &:hover {
    background: #3e313c;
  }
`;

const DirectMessage = ({ id, name, teamId }) => (
  <Link to={`/view-team/${teamId}/${id}`}>
    <ListItemWrapper>
      <Bubble /> {name}
    </ListItemWrapper>
  </Link>
);
const Channel = ({ teamId, id, name }) => (
  <Link to={`/view-team/${teamId}/${id}`}>
    <ListItemWrapper># {name}</ListItemWrapper>
  </Link>
);

export default function ChannelList({
  teamId,
  teamName,
  username,
  channels,
  directMessages,
  handleAddChannel,
  handleDirectMessage,
  handleInvitePeople,
  isAdmin,
}) {
  return (
    <Wrapper>
      <SectionWrapper>
        <HeaderArea>
          <h1>{teamName}</h1>
          {username}
        </HeaderArea>
      </SectionWrapper>
      <SectionWrapper>
        <ul>
          <SectionTitle>
            <div>Channels </div>
            {isAdmin && <Icon name='add circle' onClick={handleAddChannel} />}
          </SectionTitle>
          {channels.map((channel, i) => (
            <Channel key={`channel-${i}`} {...channel} teamId={teamId} />
          ))}
        </ul>
        <ListItemWrapper
          style={{ padding: '4px 12px 4px 15px', listStyle: 'none' }}
          onClick={handleAddChannel}
        >
          + Add a channel{' '}
        </ListItemWrapper>
      </SectionWrapper>
      <SectionWrapper>
        <ul>
          <SectionTitle>
            <div>Direct Messages </div>
            <Icon name='add circle' onClick={handleDirectMessage} />
          </SectionTitle>
          {directMessages.map((message, i) => (
            <DirectMessage key={`channel-${i}`} {...message} teamId={teamId} />
          ))}
        </ul>
      </SectionWrapper>
      <SectionWrapper>
        {isAdmin && (
          <a href='#invite-people' onClick={handleInvitePeople}>
            <ListItemWrapper
              style={{ padding: '4px 12px 4px 15px', listStyle: 'none' }}
            >
              + Invite People
            </ListItemWrapper>
          </a>
        )}
      </SectionWrapper>
    </Wrapper>
  );
}
