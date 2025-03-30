 
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

   
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

 
const personHandler = {
  get: (target, property) => {
    print(`Getting ${property} property`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const personProxy = new Proxy(new Person('Alice', 30), personHandler);

 
async function fetchData() {
  const data = await new Promise(resolve => setTimeout(() => resolve('data fetched!'), 1000));
  print(data);
}

(async function() {
   
  let { name, age } = personProxy;
  print(name, age);

  personProxy.name = 'Bob';   
  print(personProxy.greet());   

   
  const numbers = [1, 2, 3];
  const extendedNumbers = [...numbers, 4, 5, 6];
  print(extendedNumbers);

   
  await fetchData();
})();
