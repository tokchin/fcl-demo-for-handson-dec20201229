import React, { useState } from "react";
import * as fcl from "@onflow/fcl";

import Card from "../components/Card";
import Header from "../components/Header";
import Code from "../components/Code";
import Textarea from "../components/Textarea";

const simpleTransaction = `\
import HelloWorld from 0x80617c721f7c4cfa

transaction {
  execute {
    HelloWorld.hello(message: "Hello from visitor")
  }
}
`;

const SendTransaction = () => {
  const [status, setStatus] = useState("Not started");
  const [transaction, setTransaction] = useState(null);
  const [transactionCode, setTransactionCode] = useState(simpleTransaction);
  const updateTransactionCode = (event) => {
    event.preventDefault();
    setTransactionCode(event.target.value);
  };
  const sendTransaction = async (event) => {
    event.preventDefault();

    setStatus("Resolving...");

    const blockResponse = await fcl.send([fcl.getLatestBlock()]);

    const block = await fcl.decode(blockResponse);

    try {
      const { transactionId } = await fcl.send([
        fcl.transaction(transactionCode),
        fcl.proposer(fcl.currentUser().authorization),
        fcl.payer(fcl.currentUser().authorization),
        fcl.ref(block.id),
      ]);

      setStatus("Transaction sent, waiting for confirmation");

      const unsub = fcl.tx({ transactionId }).subscribe((aTransaction) => {
        setTransaction(aTransaction);

        if (fcl.tx.isSealed(aTransaction)) {
          setStatus("Transaction is Sealed");
          unsub();
        }
      });
    } catch (error) {
      console.error(error);
      setStatus("Transaction failed");
    }
  };

  return (
    <Card>
      <Header>send transaction</Header>
      <Textarea
        rows="5"
        cols="50"
        value={transactionCode}
        onChange={updateTransactionCode}
      />
      <button type="button" onClick={sendTransaction}>
        Send
      </button>
      <Code>Status: {status}</Code>
      {transaction && <Code>{JSON.stringify(transaction, null, 2)}</Code>}
    </Card>
  );
};

export default SendTransaction;
