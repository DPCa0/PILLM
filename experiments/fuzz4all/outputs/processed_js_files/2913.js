 
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

 
async function getFileContent(fileName) {
  try {
    const filePath = resolve(fileName);
    const data = await readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error(`Error reading file ${fileName}:`, error);
    throw error;
  }
}

 
async function requestHandler(req, res) {
  if (req.url === '/') {
    try {
      const content = await getFileContent('./hello.txt');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(content);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}

 
const server = createServer(requestHandler);

 
server.listen(3000, () => {
  print('Server running at http://localhost:3000/');
});

 
class Utility {
  static greet(name) {
    return `Hello, ${name}!`;
  }
}

 
const userGreetings = new Map([
  ['Alice', Utility.greet('Alice')],
  ['Bob', Utility.greet('Bob')],
]);

for (const [user, greeting] of userGreetings.entries()) {
  print(`${user}: ${greeting}`);
}

 
const promises = [
  Promise.resolve('First Success'),
  Promise.reject('Second Failed'),
  Promise.resolve('Third Success'),
];

Promise.allSettled(promises).then((results) => {
  results.forEach((result) => {
    print(result.status, result.reason || result.value);
  });
});

To make this code work, you will need to create a text file named `hello.txt` in the same directory with some content in it, such as "Hello, World!".