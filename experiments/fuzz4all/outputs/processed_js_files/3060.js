 
const fetch = require('node-fetch');
const { Worker, isMainThread, parentPort } = require('worker_threads');

 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

 
const user = {
  name: 'Alice',
  age: 30,
};

const userProxy = new Proxy(user, {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return target[property];
  },
});

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
(async () => {
  if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on('message', (msg) => print(`Worker message: ${msg}`));

     
    print(`User Name: ${userProxy.name}`);
    print(`User Age: ${userProxy.age}`);
    
     
    try {
      const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
      print('Fetched Data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

     
    const gen = numberGenerator();
    print('Generated numbers:', gen.next().value, gen.next().value, gen.next().value);
  } else {
    parentPort.postMessage('Hello from the worker!');
  }
})();
