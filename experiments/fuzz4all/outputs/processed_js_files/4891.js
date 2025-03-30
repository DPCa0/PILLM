 
import { createServer } from 'http';
import { promises as fs } from 'fs';

 
async function startServer() {
   
  const data = await fs.readFile('./data.json', 'utf-8').catch(() => '{}');
  const config = JSON.parse(data);

   
  if (config.useSpecialFeature) {
    const specialFeature = await import('./specialFeature.js');
    specialFeature.initialize();
  }

   
  const port = config?.server?.port ?? 3000;

   
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, advanced JavaScript World!');
  });

   
  server.listen(port, () => {
    const id = Symbol('serverID');
    print(`Server started on port: ${port}`);
    print(`Unique Server ID: ${id.toString()}`);
  });

   
  const bigNumber = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
  print(`BigInt example: ${bigNumber}`);
}

startServer();

**Note:** Ensure you have a `data.json` file in the same directory with appropriate JSON data and optionally a `specialFeature.js` module to fully utilize dynamic import and feature flag logic.