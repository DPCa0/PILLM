 
const handler = {
  get: (target, prop, receiver) => {
    print(`Getting property: ${prop}`);
    return Reflect.get(...arguments);
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

let user = new Proxy({ name: 'Alice', age: 25 }, handler);

 
const uniqueKey = Symbol('id');
user[uniqueKey] = 12345;

 
async function fetchData() {
  print('Fetching data...');
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data fetched!'), 2000);
  });
}

 
function* generator() {
  yield 'Step 1';
  yield 'Step 2';
  yield fetchData();
  yield 'Step 4';
}

 
(async () => {
  const gen = generator();
  for await (let step of gen) {
    print(step);
  }
})();

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

 
const { name, ...rest } = user;
print(name, rest);

 
const numbers = new Set([1, 2, 3, 4, 5]);
const doubledNumbers = Array.from(numbers, num => num * 2);
print(doubledNumbers);
