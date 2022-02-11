import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import {MathOpArgs} from './gen/math_ops_pb';
import {MathOpsClient} from './gen/math_ops_grpc_web_pb';

const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
let urls = null;
let grpcClient = null;

async function createClients() {
    urls = await fetch('/urls.json').then((response) => response.json());
    grpcClient = new MathOpsClient(urls.grpc);
    enableDevTools([grpcClient]);
}

function App() {
  const [value, setValue] = useState("Getting Value");

  useEffect(() => {
    createClients().then(() => {
      // !!!! Test code:
      const args = new MathOpArgs();
      args.setA(7);
      args.setB(6);

      grpcClient.add(args, {}, (err, response) => {
        if (!err) {
          setValue(response.getReply());
        }
      });
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Math Ops
        </p>
        <span className="App-link">{value}</span>
      </header>
    </div>
  );
}

export default App;
