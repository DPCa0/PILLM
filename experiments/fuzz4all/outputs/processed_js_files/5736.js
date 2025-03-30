 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const reactiveHandler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const state = new Proxy({ count: 0 }, reactiveHandler);

 
const uniqueValues = new Set([1, 2, 3, 3, 4, 5]);
const keyValuePairs = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]);

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

const gen = numberGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
const example = ({ a, b, ...rest }) => {
  print(`a: ${a}, b: ${b}, rest: `, rest);
};

example({ a: 1, b: 2, c: 3, d: 4 });

 
(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched Data:', data);
})();

 
class Animal {
  #name;
  constructor(name) {
    this.#name = name;
  }
  static getSpecies() {
    return 'Mammal';
  }
  getName() {
    return this.#name;
  }
}

class Dog extends Animal {
  bark() {
    print(`Woof! My name is ${this.getName()}`);
  }
}

const myDog = new Dog('