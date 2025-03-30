 

 
const asyncOperation = () => new Promise((resolve) =>
  setTimeout(() => resolve(Math.floor(Math.random() * 100)), 1000)
);

 
function* generatePromises(count) {
  for (let i = 0; i < count; i++) {
    yield asyncOperation();
  }
}

 
async function consumeGenerator(generator) {
  const results = [];
  for (let promise of generator) {
    const result = await promise;
    results.push(result);
  }
  return results;
}

 
const target = {
  message: "Hello, Proxy!",
  number: 42,
};

const handler = {
  get: (obj, prop) => {
    print(`Accessing property: ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  },
};

const proxy = new Proxy(target, handler);

 
async function main() {
  const generator = generatePromises(5);
  const results = await consumeGenerator(generator);

  print("Asynchronous operation results:", results);
  
  print(proxy.message);
  proxy.number = 84;
  print(proxy.number);
}

main();
