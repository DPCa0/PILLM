 
import { createServer } from 'http';
import { promises as fs } from 'fs';

 
async function fetchData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Error reading file');
  }
}

 
async function* dataGenerator(filePath) {
  const data = await fetchData(filePath);
  for (const item of data) {
    yield item;
  }
}

 
const handler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};

const dataProxy = new Proxy({}, handler);

 
createServer(async (req, res) => {
  if (req.url === '/data' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const dataGen = dataGenerator('./data.json');
    
    for await (const item of dataGen) {
      dataProxy.latestItem = item;
      res.write(JSON.stringify(item) + '\n');
    }
    
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(3000, () => {
  print('Server listening on port 3000');
});

 
Reflect.set(dataProxy, 'initialized', true);
