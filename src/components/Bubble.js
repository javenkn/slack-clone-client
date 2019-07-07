import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.span`
  margin-right: 5px;
`;

const BubbleIcon = styled.span`
  color: ${props => (props.online ? '#38978d' : 'unset')};
  font-size: 20px;
`;

const GroupMessageIcon = styled.span`
  background-color: rgba(193, 197, 202, 0.64);
  color: #4e3a4c;
  font-size: 10px;
  font-weight: bold;
  padding: 0 2px;
  border-radius: 2px;
`;

export default function Bubble({ online = false, groupLength }) {
  function renderIcon() {
    if (groupLength > 1) {
      return <GroupMessageIcon>{groupLength}</GroupMessageIcon>;
    } else if (online) {
      return <BubbleIcon online={online}>●</BubbleIcon>;
    }
    return <BubbleIcon>○</BubbleIcon>;
  }
  return <Wrapper>{renderIcon()}</Wrapper>;
}
