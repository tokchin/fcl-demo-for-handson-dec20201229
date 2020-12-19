import React, { useState } from 'react';
import * as fcl from '@onflow/fcl';

import Card from '../components/Card';
import Header from '../components/Header';
import Code from '../components/Code';
import CodeEditor from '../components/CodeEditor';
import InnerSection from '../components/innerSection';

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
    await fcl
      .send([fcl.script(script)])
      .then(async (response) => {
        setData(await fcl.decode(response));
      })
      .catch((error) => {
        setData(String(error));
      });
  };

  return (
    <Card>
      <Header>run script</Header>
      <InnerSection>
        <CodeEditor value={script} onChange={updateScript} />
      </InnerSection>
      <InnerSection>
        <button type="button" onClick={runScript}>
          Run Script
        </button>
      </InnerSection>
      <InnerSection>
        {data && <Code>{JSON.stringify(data, null, 2)}</Code>}
      </InnerSection>
    </Card>
  );
}
