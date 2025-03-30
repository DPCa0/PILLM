 
import { readFile } from 'fs/promises';
import { createServer } from 'http';

 
async function* streamFile(filePath) {
  const data = await readFile(filePath, 'utf8');
  for (const line of data.split('\n')) {
    yield line;
  }
}

 
const requestHandler = new Proxy((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    (async () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      for await (const line of streamFile('./data.txt')) {
        res.write(line + '\n');
      }
      res.end();
    })();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}, {
  apply: (target, thisArg, argumentsList) => {
    print(`Request received: ${argumentsList[0].method} ${argumentsList[0].url}`);
    return Reflect.apply(target, thisArg, argumentsList);
  }
});

 
createServer(requestHandler).listen(3000, () => {
  console.log(customLog`Server running at http: 
});

 
function customLog(strings, ...values) {
  return strings.reduce((acc, str, index) => `${acc}${str}${values[index] || ''}`, '');
}

This program demonstrates using advanced JavaScript features like async generators, the Proxy object, dynamic imports (only supported in environments like Node.js with ESM), and tagged template literals in a web server context. It reads a file line by line using an async generator and streams it over HTTP, logging request details with a Proxy handler.