(async () => {
   
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch data: ${error.message}`);
    }
  };

   
  const person = {
    firstName: 'John',
    lastName: 'Doe',
  };
  
  const handler = {
    get: (target, property) => {
      print(`Getting ${property}`);
      return target[property];
    },
    set: (target, property, value) => {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  };
  
  const proxyPerson = new Proxy(person, handler);
  
   
  const { firstName, lastName, age = 30 } = proxyPerson;
  
   
  function format(strings, ...values) {
    return strings.reduce((prev, curr, i) => `${prev}${curr}${values[i] || ''}`, '');
  }
  
  print(format`Hello, my name is ${firstName} ${lastName} and I am ${age} years old.`);
  
   
  const map = new Map();
  map.set('name', 'Alice');
  map.set('age', 25);
  
  const set = new Set([1, 2, 3, 4, 4, 5]);
  
  print('Map contents:', [...map.entries()]);
  print('Set contents:', [...set]);

   
  const privateAge = Symbol('privateAge');
  class Person {
    constructor(name, age) {
      this.name = name;
      this[privateAge] = age;
    }

    get age() {
      return this[privateAge];
    }
  }

  const john = new Person('John', 40);
  print(`Accessing private property: ${john.age}`);

   
  const dataIterable = {
    async *[Symbol.asyncIterator]() {
      const data = await fetchData('https: 