import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  CssBaseline,
  Divider,
  MenuItem,
  TextField,
  ThemeProvider,
  createTheme
} from '@mui/material';

import './App.css';

// gRPC
import { MathOpArgs } from './gen/math_ops_pb';
import { MathOpsPromiseClient } from './gen/math_ops_grpc_web_pb';

// REST
import { OpenAPI } from './gen/MathOps/core/OpenAPI';
import { MathOpsRestClient } from './gen/MathOps/services/MathOpsRestClient';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
let urls = null;

async function createClients() {
  urls = await fetch('/urls.json').then((response) => response.json());

  const grpcClient = new MathOpsPromiseClient(urls.grpc);
  enableDevTools([grpcClient]);

  OpenAPI.BASE = urls.rest;
  const restClient = MathOpsRestClient;

  return {grpcClient, restClient};
}

function App() {
  const [a, setA] = useState("7");
  const [b, setB] = useState("6");
  const [op, setOp] = useState("*");
  const [value, setValue] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    createClients().then((clients) => Object.assign(window, clients));
  }, []);

  useEffect(() => {
    clearValue();
  }, [a, b, op]);

  function clearValue() {
    setValue("No result, yet.");
  }

  async function send(client) {
    if (!a || !b || !op) {
      setErrorOpen(true);
      return;
    }

    clearValue();

    if (client === window.restClient) {
      const args = {
        a,
        b,
      };

      let result;
      try {
        switch (op) {
          case "+": result = await client.mathOpsAdd(args, {}); break;
          case "-": result = await client.mathOpsSubtract(args, {}); break;
          case "*": result = await client.mathOpsMultiply(args, {}); break;
          case "/": result = await client.mathOpsDivide(args, {}); break;
          case "%": result = await client.mathOpsRemainder(args, {}); break;
          default: break;
        }
        setValue(result.reply);
      } catch(err) {
        alert(err.message);
        return;
      }
    } else {
      const args = new MathOpArgs();
      args.setA(a);
      args.setB(b);

      let result;
      try {
        switch (op) {
          case "+": result = await client.add(args, {}); break;
          case "-": result = await client.subtract(args, {}); break;
          case "*": result = await client.multiply(args, {}); break;
          case "/": result = await client.divide(args, {}); break;
          case "%": result = await client.remainder(args, {}); break;
          default: break;
        }
        setValue(result.getReply());
      } catch(err) {
        alert(err.message);
        return;
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dialog open={errorOpen} onClose={() => setErrorOpen(false)}>
        <DialogTitle>Some fields are empty.</DialogTitle>
        <div className=".Dialog-content">
          <p>
            Before you can send a request, you must fill out A, Op, and B.
          </p>
        </div>
      </Dialog>
      <div className="App">
        <header className="App-header">
          <h1>Math Ops</h1>
          <div className="Number-container">
            <TextField
              label="A"
              variant="standard"
              type="number"
              value={a}
              onChange={(e)=>setA(e.target.value)}
            />
            <TextField label="Op" select value={op} onChange={(e)=>setOp(e.target.value)}>
              <MenuItem key="+" value="+">+</MenuItem>
              <MenuItem key="-" value="-">-</MenuItem>
              <MenuItem key="*" value="*">*</MenuItem>
              <MenuItem key="/" value="/">/</MenuItem>
              <MenuItem key="%" value="%">%</MenuItem>
            </TextField>
            <TextField
              label="B"
              variant="standard"
              type="number"
              value={b}
              onChange={(e)=>setB(e.target.value)}
            />
          </div>
          <Divider flexItem />
          <span className="App-link">{value}</span>
          <Divider flexItem />
          <div className="Button-container">
            <Button variant="contained" onClick={()=>send(window.restClient)}>
              Send to REST Gateway
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button variant="contained" onClick={()=>send(window.grpcClient)}>
              Send to gRPC Service
            </Button>
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
