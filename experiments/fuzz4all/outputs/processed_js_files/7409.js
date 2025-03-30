 
import { createServer } from 'http';
import { readFile } from 'fs/promises';

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const startServer = async () => {
  const data = await readFile('./data.json', 'utf-8').catch(() => '{"message": "No data available"}');
  const server = createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      await delay(1000);  
      const { message } = JSON.parse(data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message }));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

   
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http: 
  });
};

 
(() => startServer())();

To run this code, make sure to have a file named `data.json` in the same directory with some JSON content like:

{
  "message": "Hello, World!"
}
