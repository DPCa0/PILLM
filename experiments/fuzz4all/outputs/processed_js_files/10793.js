 
import { promises as fs } from 'fs';
import { createServer } from 'http';
import { EventEmitter } from 'events';

 
async function logFileContent(fileName) {
  try {
    const content = await fs.readFile(fileName, 'utf-8');
    print(`File Content of ${fileName}:\n`, content);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
const handler = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return (...args) => {
        print(`Method ${property} invoked with args:`, args);
        return target[property](...args);
      };
    }
    return target[property];
  }
};

const targetObject = {
  displayMessage(message) {
    print('Message:', message);
  }
};

const proxy = new Proxy(targetObject, handler);

 
const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => print('Server is starting...'));
eventEmitter.on('request', (url) => print('Request received for:', url));

 
const server = createServer(async (req, res) => {
  eventEmitter.emit('request', req.url);
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, advanced JavaScript!\n');
  } else if (req.url === '/read-file') {
    await logFileContent('example.txt');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('File content logged to console.\n');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

 
const PORT = 3000;
const HOST = 'localhost';
server.listen(PORT, HOST, () => {
  const { address, port } = server.address();
  eventEmitter.emit('start');
  proxy.displayMessage(`Server is running at http: 
});
