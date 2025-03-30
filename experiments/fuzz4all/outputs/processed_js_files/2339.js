 
import { readFile } from 'fs/promises';
import { createServer } from 'http';

 
const fetchJsonData = async (fileName) => {
  try {
    const data = await readFile(new URL(`./${fileName}`, import.meta.url), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    throw error;
  }
};

 
function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  while (limit--) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const config = { host: 'localhost', port: 8000 };
const configProxy = new Proxy(config, {
  get(target, prop) {
    print(`Accessing ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
});

 
(async () => {
  try {
    const jsonData = await fetchJsonData('data.json');
    const fibGen = fibonacciGenerator(10);
    const fibonacciSeries = [...fibGen];

    print('Fibonacci Series:', fibonacciSeries);
    print('JSON Data:', jsonData);

     
    const { host, port } = configProxy;
    console.log(`Server will run on http: 

     
    const server = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, world!');
    });

    server.listen(port, host, () => {
      console.log(`Server running at http: 
    });

  } catch (error) {
    console.error('Error in async function:', error);
  }
})();
