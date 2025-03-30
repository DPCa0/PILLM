 
import { readFile } from 'fs/promises';
import http from 'http';

 
async function getDataFromFile(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading the file:', error);
    return null;
  }
}

 
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

 
const eventEmitter = new EventEmitter();

 
eventEmitter.on('dataReceived', (data) => {
  print('Data received:', data);
});

 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: 'Hello, world!', timestamp: new Date() };
      resolve(data);
    }, 1000);
  });
}

 
http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const dataFromFile = await getDataFromFile('./data.json');
    const fetchedData = await fetchData();
    
    eventEmitter.emit('dataReceived', { file: dataFromFile, fetched: fetchedData });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ file: dataFromFile, fetched: fetchedData }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(3000, () => {
  print('Server is listening on port 3000');
});

 
const uniqueSymbol = Symbol('unique');

 
const complexObject = {
  [uniqueSymbol]: