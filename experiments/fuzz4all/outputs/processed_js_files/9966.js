 

 
const targetObject = {
  a: 1,
  b: 2,
  c: 3
};

const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Accessed property "${prop}" with value "${target[prop]}"`);
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property "${prop}" not found.`;
    }
  }
};

const proxy = new Proxy(targetObject, handler);

 
async function* asyncGenerator() {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const json = await data.json();
  yield json;
}

async function processGenerator() {
  const asyncGen = asyncGenerator();
  for await (const val of asyncGen) {
    print(`Received data:`, val);
  }
}

 
const { a, b, c } = proxy;
print('Destructured Values:', a, b, c);

 
processGenerator();

Note: Make sure to run this code in an environment that supports the Fetch API and ES6+ JavaScript features.