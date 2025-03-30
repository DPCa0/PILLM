 
const { EventEmitter } = require('events');

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('URL is required');
      }
    }, 1000);
  });
}

 
function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const logArrayOperations = (arr) => new Proxy(arr, {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
});

 
const eventEmitter = new EventEmitter();
eventEmitter.on('dataReceived', (data) => {
  print(`Data Event: ${data}`);
});

 
(async () => {
  try {
    const data = await fetchData('http://example.com');
    eventEmitter.emit('dataReceived', data);
    
    const fibGen = fibonacciGenerator();
    print(`Fibonacci: ${fibGen.next().value}`);
    
    const arr = logArrayOperations([1, 2, 3]);
    print(arr[0]);
    arr.push(4);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();
