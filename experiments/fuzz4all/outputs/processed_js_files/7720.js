 
import fs from 'fs/promises';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

 
async function loadConfig() {
  try {
    const data = await fs.readFile('config.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config file:', error);
    return {};
  }
}

 
const getConfigValue = (config, key) => config?.[key] ?? 'Default';

 
const config = await loadConfig();

 
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

 
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    print(`Received: ${message}`);
    
     
    ws.send(`You sent: ${message || 'nothing'}, Configuration: ${getConfigValue(config, 'message')}`);
  });

   
  ws.send(`Connection established. Config Message: ${getConfigValue(config, 'welcome')}`);
});

 
server.listen(...[(config.port || 3000)], () => {
  print(`Server started on port ${config.port || 3000}`);
});

 
(async () => {
   
  const map = new Map();
  map.set('feature', 'JavaScript ES2020+');

   
  for (const [key, value] of map) {
    print(`Advanced Feature: ${key}, Description: ${value}`);
  }

   
  const sym = Symbol('unique');
  const bigIntExample = 9007199254740991n;

  print(`Symbol: ${sym.toString()}, BigInt: ${bigIntExample}`);
})();

This script demonstrates several modern JavaScript features, such as modules, async/await, template literals, optional chaining, null