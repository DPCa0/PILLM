 
import { createServer } from 'http';
import { readFile } from 'fs/promises';

 
const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : `Property ${prop} not found`),
};

const complexObject = new Proxy(
  {
    data: {
      id: 1,
      name: 'Advanced JS',
    },
    async fetchData() {
      return await readFile('data.json', 'utf8');
    },
  },
  handler
);

 
class DataStream {
  constructor(data) {
    this.data = data;
  }

  async *[Symbol.asyncIterator]() {
    for (const chunk of this.data) {
      await new Promise((resolve) => setTimeout(resolve, 100));  
      yield chunk;
    }
  }
}

 
createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/data') {
    const dataStream = new DataStream(['Hello', ' ', 'world', '!']);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    for await (const chunk of dataStream) {
      res.write(chunk);
    }
    res.end();
  } else if (req.method === 'GET' && req.url === '/info') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(complexObject.data));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(complexObject.unknownProp);
  }
}).listen(3000, () => print('Server running on http://localhost:3000'));

 
(async () => {
  if (Math.random() > 0.5) {
    const { performance } = await import('perf_hooks');
    print('Random Event: Performance time origin is', performance.timeOrigin);
  }
})();
