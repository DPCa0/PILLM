 

 
const handler = {
  set(target, property, value) {
    print(`Setting value ${value} to ${property}`);
    target[property] = value;
    return true;
  }
};

const person = new Proxy({}, handler);
person.name = 'Alice';

 
function* fibonacci(limit) {
  let a = 0, b = 1, count = 0;
  while (count < limit) {
    yield a;
    [a, b] = [b, a + b];
    count++;
  }
}

const fibSeq = fibonacci(5);
for (const num of fibSeq) {
  print(num);
}

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    let data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData('https://api.github.com/users/octocat');

 
const uniqueValues = new Set([1, 2, 3, 4, 4, 5]);
uniqueValues.add(6);
print(uniqueValues);

const mappedValues = new Map();
mappedValues.set('key1', 'value1').set('key2', 'value2');
print(mappedValues.get('key1'));

 
const arr = [1, 2, 3, 4];
const [first, ...rest] = arr;
print(first, rest);

const obj = { x: 1, y: 2 };
const objClone = { ...obj, z: 3 };
print(objClone);

 
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    print(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    super.speak();
    print(`${this.name} barks.`);
  }
}

const d = new Dog('Rex');
d.speak();
