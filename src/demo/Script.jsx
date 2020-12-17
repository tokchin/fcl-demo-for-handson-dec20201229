import React, { useState } from 'react';
import * as fcl from '@onflow/fcl';

import Card from '../components/Card';
import Header from '../components/Header';
import Code from '../components/Code';
import CodeEditor from '../components/CodeEditor';

const scriptOne = `\
pub fun main(): Int {
  return 42 + 6
}
`;

export default function ScriptOne() {
  const [data, setData] = useState(null);
  const [script, setScript] = useState(scriptOne);
  const updateScript = (value) => {
    setScript(value);
  };
  const runScript = async (event) => {
    event.preventDefault();

    const response = await fcl.send([fcl.script(script)]);

    setData(await fcl.decode(response));
  };

  return (
    <Card>
      <Header>run script</Header>

      <CodeEditor value={script} onChange={updateScript} />
      <button type="button" onClick={runScript}>
        Run Script
      </button>

      {data && <Code>{JSON.stringify(data, null, 2)}</Code>}
    </Card>
  );
}
