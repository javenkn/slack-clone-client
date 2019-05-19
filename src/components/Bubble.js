import React from 'react';
import styled from 'styled-components';

const Green = styled.span`
  color: #38978d;
`;

export default function Bubble({ online = true }) {
  return online ? <Green>●</Green> : '○';
}
