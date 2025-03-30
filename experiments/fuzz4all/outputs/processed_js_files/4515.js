 
const { readFileSync, promises: fsPromises } = require('fs');
const { createServer } = require('http');
const { parse } = require('url');

 
const readFileAsync = async (path) => {
  try {
    return await fsPromises.readFile(path, 'utf-8');
  } catch (error) {
    console.error(`Error reading file: ${path}`, error);
  }
};

 
async function fetchData() {
  const simulatedApiData = '{"message": "Hello, world!", "timestamp": 1633072958000}';
  return new Promise(resolve => setTimeout(() => resolve(JSON.parse(simulatedApiData)), 1000));
}

 
(async () => {
   
  const config = await readFileAsync('./config.json');
  
   
  print('Config:', config);

   
  const server = createServer(async (req, res) => {
    const { pathname } = parse(req.url, true);

    if (pathname === '/data') {
      const data = await fetchData();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });

   
  const PORT = process.env.PORT ?? 3000;

   
  server.listen(PORT, () => {
    print(`Server listening on port ${PORT}`);
  });

   
  const exampleConfig = { settings: { theme: null } };
  const theme = exampleConfig.settings?.theme ?? 'default';
  print('Theme:', theme);
})();
