 
const { createServer } = require('http');
const { readFile } = require('fs').promises;

 
(async () => {
  try {
     
    const data = await readFile('./example.txt', 'utf8');

     
    const cache = new Map();
    cache.set('fileData', data);

     
    const { fileData } = Object.fromEntries(cache);
    const serverMessage = `Cached Data: ${fileData}`;

     
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(serverMessage);
    });

     
    server.listen(3000, () => {
      print('Server running on http://localhost:3000');
    });

     
    const nums = [1, 2, 3];
    const double = nums.map(n => n * 2);
    print('Doubled Numbers:', ...double);

     
    const userSettings = { theme: { color: 'dark' } };
    const themeColor = userSettings?.theme?.color ?? 'light';
    print('Theme Color:', themeColor);

  } catch (error) {
    console.error('Error:', error);
  }
})();
