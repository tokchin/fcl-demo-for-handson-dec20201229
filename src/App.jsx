import React from 'react';
import styled from 'styled-components';
import Section from './components/Section';
import Header from './components/Header';
import GetAccount from './hooks/GetAccount';
import Script from './hooks/Script';
import Authenticate from './hooks/Authenticate';
import UserInfo from './hooks/UserInfo';
import SendTransaction from './hooks/SendTransaction';
import DeployContract from './hooks/DeployContract';

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
