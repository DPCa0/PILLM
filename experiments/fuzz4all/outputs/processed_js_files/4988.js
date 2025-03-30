 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Important data from API' });
    }, 1000);
  });
};

 
async function handleData() {
  print('Fetching data...');
  const { data } = await fetchData();
  print('Data received:', data);
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGenInstance = idGenerator();

 
const objHandler = {
  get(target, prop, receiver) {
    print(`Getting property '${prop}'`);
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    return `Property '${prop}' does not exist.`;
  },
};

const user = {
  name: 'Alice',
  age: 25,
  [Symbol.iterator]: function* () {
    yield* Object.entries(this);
  },
};

const proxyUser = new Proxy(user, objHandler);

 
function main() {
  print('--- Proxy Example ---');
  print('Name:', proxyUser.name);
  print('Age:', proxyUser.age);
  print('Address:', proxyUser.address);  

  print('--- ID Generator Example ---');
  print('Generated ID:', idGenInstance.next().value);
  print('Generated ID:', idGenInstance.next().value);

  print('--- Handle Data ---');
  handleData();

  print('--- Iterating with Symbol.iterator ---');
  for (let [key, value] of proxyUser) {
    print(`${key}: ${value}`);
  }
}

 
main();
