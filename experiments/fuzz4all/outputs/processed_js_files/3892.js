 
class Person {
  #firstName;
  #lastName;
  
  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }
  
  #fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }
  
  greet() {
    print(`Hello, my name is ${this.#fullName()}.`);
  }
}

 
const handler = {
  get: function(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  }
};

const john = new Person('John', 'Doe');
const proxyJohn = new Proxy(john, handler);

 
proxyJohn.greet();

 
async function getData() {
  const dataSources = [
    Promise.resolve('Data from API 1'),
    Promise.reject('Failed to fetch API 2'),
    new Promise(resolve => setTimeout(() => resolve('Data from API 3'), 1000))
  ];
  
  const results = await Promise.allSettled(dataSources);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Result from API ${index + 1}: ${result.value}`);
    } else {
      print(`Error from API ${index + 1}: ${result.reason}`);
    }
  });
}

getData();

 
function* numberGenerator() {
  let num = 0;
  while (num < 5) {
    yield num++;
  }
}

const gen = numberGenerator();

for (let value of gen) {
  print(`Generated number: ${value}`);
}

 
function tag(strings, ...values) {
  print('Tag function called!');
  return strings.raw[0] + values.join('');
}

const rawString = tag`Hello, \nworld!`;

print(rawString);
