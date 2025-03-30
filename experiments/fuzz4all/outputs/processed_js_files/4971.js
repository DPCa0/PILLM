 
const fs = require('fs').promises;
const http = require('http');

 
async function processData() {
   
  const response = await fs.readFile('./data.json', 'utf-8');
  let { users, ...metadata } = JSON.parse(response);
  let enrichedUsers = users.map(({ id, name, ...details }) => ({
    id,
    name: name.toUpperCase(),
    ...details,
    timestamp: new Date().toISOString(),
  }));
  return { enrichedUsers, metadata };
}

 
http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    try {
       
      const { enrichedUsers, metadata } = await processData();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ enrichedUsers, metadata }, null, 2));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error: ${error.message}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(8080, () => {
  print('Server running at http://localhost:8080/');
});

To run this code, you'll need a file named `data.json` with some sample data in the same directory as the script.