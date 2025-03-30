 
const _age = Symbol('age');
class Person {
  constructor(name, age) {
    this.name = name;
    this[_age] = age;
  }
  
  get age() {
    return this[_age];
  }
  
  incrementAge() {
    this[_age]++;
  }
}

 
const loggingHandler = {
  get(target, prop, receiver) {
    print(`Property '${prop.toString()}' accessed`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting value '${value}' to property '${prop.toString()}'`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
async function importGreetModule() {
  const { default: greet } = await import('./greetModule.js');
  greet();
}

 
async function loadData() {
  try {
    const data = await fetch('https://api.example.com/data').then(res => res.json());
    print('Data loaded:', data);
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

 
const john = new Person('John Doe', 30);
const proxiedJohn = new Proxy(john, loggingHandler);

 
print(`Name: ${proxiedJohn.name}`);
print(`Age: ${proxiedJohn.age}`);
proxiedJohn.incrementAge();
print(`New Age: ${proxiedJohn.age}`);

 
importGreetModule();
loadData();

 
const numbers = [1, 2, 3, 4];
const squares = numbers.map(n => n * n);
const sumOfSquares = squares.reduce((sum, n) => sum + n, 0);
print('Squares:', ...squares);
print('Sum of Squares:', sumOfSquares);
Note: This code assumes the existence of a `greetModule.js` with a default export function called `greet` and a valid API endpoint at `https: 