 

 
const uniqueSymbol = Symbol('uniqueProperty');

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data loaded successfully!');
    }, 1000);
  });
}

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

 
const targetObject = {
  [uniqueSymbol]: 'I am unique!',
  greet: 'Hello',
  data: 'Initial data',
};

 
const proxyHandler = {
  get(target, property) {
    if (property in target) {
      print(`Getting property ${String(property)}: ${target[property]}`);
      return target[property];
    }
    print(`Property ${String(property)} does not exist!`);
  },
  set(target, property, value) {
    print(`Setting property ${String(property)} to ${value}`);
    target[property] = value;
    return true;
  },
};

const proxiedObject = new Proxy(targetObject, proxyHandler);

 
async function main() {
  print(`Initial ID: ${idGen.next().value}`);
  print(`Unique Symbol Property: ${proxiedObject[uniqueSymbol]}`);

  proxiedObject.greet = 'Hi there!';
  print(proxiedObject.greet);

  print(`Fetching data asynchronously...`);
  proxiedObject.data = await fetchData();
  print(proxiedObject.data);

  print(`Next ID: ${idGen.next().value}`);
}

main();
