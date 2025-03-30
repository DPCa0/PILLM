 
async function simulateAsyncTask(id, duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${id} completed after ${duration}ms`);
    }, duration);
  });
}

 
function* fibonacciSequence(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const handler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return prop in target ? target[prop] : `No such property: ${prop}`;
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const person = new Proxy({}, handler);
person.name = 'Alice';
print(person.name);
print(person.age);  

 
const uniqueValues = new Set([1, 2, 3, 3, 4]);
print('Unique values:', [...uniqueValues]);

const keyValuePairs = new Map();
keyValuePairs.set('key1', 'value1');
keyValuePairs.set('key2', 'value2');
print('Key-value pairs:', Array.from(keyValuePairs));

 
const data = (({ a, b, ...rest }) => {
  print('a:', a);
  print('b:', b);
  return rest;
})({ a: 1, b: 2, c: 3, d: 4 });

 
(async () => {
  const tasks = [simulateAsyncTask(1, 1000), simulateAsyncTask(2, 500), simulateAsyncTask(3, 2000)];
  for await (const message of Promise.all(tasks)) {
    print(message);
  }
})();

 
const fib = fibonacciSequence(5);
for (const num of fib) {
  print('Fibonacci number:', num);
}
