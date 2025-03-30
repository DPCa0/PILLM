 
import { promises as fs } from 'fs';
import { createServer } from 'http';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
   
  try {
    const data = await fs.readFile('config.json', 'utf8');
    const config = JSON.parse(data);
    
     
    const { port, ...otherConfig } = config;

     
    const server = createServer((req, res) => {
      if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });

         
        res.end(JSON.stringify({ message: `Server running with configuration: ${JSON.stringify(otherConfig)}` }));
      }
    });

     
    server.listen(port, () => {
      print(`Server listening on port ${port}`);
    });

  } catch (error) {
    console.error('Error reading config file:', error);
  }

   
  print('Delaying for 2 seconds...');
  await delay(2000);
  print('Continuing execution after delay.');

   
  const map = new Map();
  map.set('name', 'Advanced JavaScript');
  map.set('version', 'ES2023');

   
  for (const [key, value] of map) {
    print(`${key}: ${value}`);
  }
})();
