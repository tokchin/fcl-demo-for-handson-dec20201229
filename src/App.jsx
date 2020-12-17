import React from 'react';
import styled from 'styled-components';

import Section from './components/Section';
import Header from './components/Header';

import GetAccount from './demo/GetAccount';
import Script from './demo/Script';
import Authenticate from './demo/Authenticate';
import UserInfo from './demo/UserInfo';
import SendTransaction from './demo/SendTransaction';
import DeployContract from './demo/DeployContract';

const Wrapper = styled.div`
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
`;

function App() {
  return (
    <Wrapper>
      <Section>
        <Header>FCL wallet interactions</Header>
        <Authenticate />
        <UserInfo />
        <GetAccount />
        <Script />
        <SendTransaction />
        <DeployContract />
      </Section>
    </Wrapper>
  );
}

export default App;
