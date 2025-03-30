 
import { promises as fs } from 'fs';
import { createServer } from 'http';
import { pipeline } from 'stream/promises';

 
async function readWriteFile() {
  try {
    const data = await fs.readFile('input.txt', 'utf8');  
    const transformedData = data.split('').reverse().join('');  

    await fs.writeFile('output.txt', transformedData, 'utf8');  

    print('File successfully transformed and saved as output.txt');
  } catch (error) {
    console.error('Error in file operations:', error);
  }
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const generateId = idGenerator();

 
const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

     
    await pipeline(
      async function* () {
        for (let i = 0; i < 5; i++) {
          yield `Hello, your unique ID is ${generateId.next().value}\n`;
        }
      },
      res
    );
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

 
server.listen(3000, () => {
  print('Server running at http://localhost:3000/');
});

 
(async () => {
  print('Starting file operations...');
  await readWriteFile();
})();
