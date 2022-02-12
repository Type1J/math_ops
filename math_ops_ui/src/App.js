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

import {MathOpArgs} from './gen/math_ops_pb';
import {MathOpsPromiseClient} from './gen/math_ops_grpc_web_pb';
import {MathOpsRestClient} from './math_ops_rest';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
let urls = null;

async function createClients() {
    urls = await fetch('/urls.json').then((response) => response.json());
    let grpcClient = new MathOpsPromiseClient(urls.grpc);
    let restClient = new MathOpsRestClient(urls.rest);
    enableDevTools([grpcClient]);
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

    let args;
    if (client === window.restClient) {
      args = {
        a,
        b,
      };
    } else {
      args = new MathOpArgs();
      args.setA(a);
      args.setB(b);
    }

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
    } catch(err) {
      alert(err.message);
      return;
    }

    if (client === window.restClient) {
      setValue(result.reply);
    } else {
      setValue(result.getReply());
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
