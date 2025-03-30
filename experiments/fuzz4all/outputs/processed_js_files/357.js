 
import fs from 'fs/promises';
import { createServer } from 'http';

 
async function readConfig() {
  try {
    const data = await fs.readFile('config.json', 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading config file:', err);
    return { port: 8080 };  
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    return prop in target ? target[prop] : `Property ${prop} not found`;
  },
};

const configDefaults = {
  host: 'localhost',
  port: 3000,
};

const configProxy = new Proxy(configDefaults, handler);

 
const withLogging = (fn) => (...args) => {
  print(`Calling function ${fn.name} with args:`, args);
  const result = fn(...args);
  print(`Result:`, result);
  return result;
};

 
const add = (a, b) => a + b;
const square = (x) => x * x;
const squareOfSum = withLogging((a, b) => square(add(a, b)));

 
(async () => {
  const config = await readConfig();

   
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from ${configProxy.host}:${config.port}\n`);
  });

   
  server.listen(configProxy.port, configProxy.host, () => {
    console.log(`Server running at http: 
  });

   
  print(`The square of the sum is: ${squareOfSum(3, 4)}`);
})();

Make sure to create a `config.json` file in the same directory with content similar to:
{
  "port": 8000
}
This script demonstrates various advanced features including async/await, Promises, proxies, higher-order functions, and module usage.