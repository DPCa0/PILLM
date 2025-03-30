 
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { EventEmitter } from 'events';

 
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

 
async function readJSONFile(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading the file:', err);
    return null;
  }
}

 
const formatResponse = (message) => `Server Response: ${message}`;

 
const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const data = await readJSONFile('./data.json');
    const responseMessage = data ? `Data: ${JSON.stringify(data)}` : 'No Data Found';

     
    myEmitter.emit('dataRequest', responseMessage);

     
    const headers = { 'Content-Type': 'text/plain' };
    res.writeHead(200, headers);
    res.end(formatResponse(responseMessage));
  }
});

 
myEmitter.on('dataRequest', (message) => {
  print('Event Triggered:', message);
});

 
server.listen(3000, () => {
  print('Server is running on http://localhost:3000');
});

 
(async () => {
  print('Starting async operations...');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  print('Async operations complete.');
})();
