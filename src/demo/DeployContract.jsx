import React, { useState } from 'react';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

import Card from '../components/Card';
import Header from '../components/Header';
import Code from '../components/Code';
import CodeEditor from '../components/CodeEditor';

const deployTransaction = `\
transaction(code: String) {
  prepare(acct: AuthAccount) {
    acct.contracts.add(name: "HelloWorld", code: code.decodeHex())
  }
}
`;

const simpleContract = `\
pub contract HelloWorld {
  pub let greeting: String
  pub event HelloEvent(message: String)

  init() {
    self.greeting = "Hello, World!"
  }

  pub fun hello(message: String): String {
    emit HelloEvent(message: message)
    return self.greeting
  }
}
`;

const DeployContract = () => {
  const [status, setStatus] = useState('Not started');
  const [transaction, setTransaction] = useState(null);
  const [contract, setContract] = useState(simpleContract);
  const updateContract = (value) => {
    setContract(value);
  };
  const runTransaction = async (event) => {
    event.preventDefault();

    setStatus('Resolving...');

    const blockResponse = await fcl.send([fcl.getLatestBlock()]);

    const block = await fcl.decode(blockResponse);

    try {
      const { transactionId } = await fcl.send([
        fcl.transaction(deployTransaction),
        fcl.args([
          fcl.arg(Buffer.from(contract, 'utf8').toString('hex'), t.String),
        ]),
        fcl.proposer(fcl.currentUser().authorization),
        fcl.authorizations([fcl.currentUser().authorization]),
        fcl.payer(fcl.currentUser().authorization),
        fcl.ref(block.id),
      ]);

      setStatus('Transaction sent, waiting for confirmation');

      const unsub = fcl.tx({ transactionId }).subscribe((aTransaction) => {
        setTransaction(aTransaction);

        if (fcl.tx.isSealed(aTransaction)) {
          setStatus('Transaction is Sealed');
          unsub();
        }
      });
    } catch (error) {
      console.error(error);
      setStatus('Transaction failed');
    }
  };

  return (
    <Card>
      <Header>deploy contract</Header>

      <CodeEditor value={contract} onChange={updateContract} />

      <button type="button" onClick={runTransaction}>
        Deploy Contract
      </button>

      <Code>Status: {status}</Code>

      {transaction && <Code>{JSON.stringify(transaction, null, 2)}</Code>}
    </Card>
  );
};

export default DeployContract;
