 

 
import { createServer } from 'http';

 
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
  return response.json();
}

 
const dataHandler = {
  get(target, prop) {
    print(`Accessing property '${prop}'`);
    return Reflect.get(target, prop);
  }
};

const data = new Proxy({ message: "Hello, Proxy!" }, dataHandler);

 
(async () => {
  try {
     
    const jsonData = await fetchJson('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched JSON:', jsonData);

     
    print(data.message);

     
    const server = createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, Server!\n');
    });

    server.listen(3000, '127.0.0.1', () => {
      print('Server running at http://127.0.0.1:3000/');
    });

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
