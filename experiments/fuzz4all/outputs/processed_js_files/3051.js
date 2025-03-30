 
import { readFile } from 'fs/promises';
import { createServer } from 'http';

 
async function fetchJSONData() {
  try {
     
    const data = await readFile(new URL('./data.json', import.meta.url), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON data:', error);
    throw error;
  }
}

 
const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    try {
       
      const jsonData = await fetchJSONData();
      
       
      const handler = {
        get: (obj, prop) => {
          print(`Accessing property '${prop}'`);
          return obj[prop] ?? 'Property not found';
        }
      };
      const proxyData = new Proxy(jsonData, handler);
      
       
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(proxyData));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

 
server.listen(3000, () => {
  print('Server running at http://localhost:3000/');
});

This code uses asynchronous file operations with promises, HTTP server creation, and the Proxy object for dynamic property access logging, demonstrating advanced JavaScript features in a complex way.