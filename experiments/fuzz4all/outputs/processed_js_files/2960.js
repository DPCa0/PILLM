 
const uniqueSymbol = Symbol('unique');

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Property '${property}' accessed.`);
      return target[property];
    } else {
      return `Property '${property}' does not exist.`;
    }
  },
  set(target, property, value) {
    print(`Property '${property}' set to '${value}'.`);
    target[property] = value;
    return true;
  }
};

 
let person = {
  name: 'Alice',
  age: 30,
  [uniqueSymbol]: 'This is a unique property'
};

 
const proxyPerson = new Proxy(person, handler);

 
const { name, age, gender = 'Not Specified' } = proxyPerson;
print(`Name: ${name}, Age: ${age}, Gender: ${gender}`);

 
proxyPerson.occupation = 'Engineer';

 
print(`Person Info: ${proxyPerson.name}, ${proxyPerson.age}, ${proxyPerson.occupation}`);

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
  print('Fetching data...');
  await delay(1000);
  print('Data fetched!');
}

fetchData();

 
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const numbers = numberGenerator();
for (const num of numbers) {
  print(`Generated number: ${num}`);
}

 
print(`Unique Property: ${proxyPerson?.[uniqueSymbol] || 'Not Available'}`);

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

print('Map contents:');
for (const [key, value] of map) {
  print(`${key}: ${value}`);
}
