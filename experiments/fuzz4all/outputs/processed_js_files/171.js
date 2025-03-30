 
const calculate = ({ op, ...nums }) => {
  const operations = {
    add: (...args) => args.reduce((a, b) => a + b, 0),
    multiply: (...args) => args.reduce((a, b) => a * b, 1),
  };
  return operations[op](...Object.values(nums));
};

 
const fetchData = async (url) => {
   
  const mockFetch = (url) =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ json: () => ({ data: `Data from ${url}` }) }), 1000)
    );

  try {
    const response = await mockFetch(url);
    const data = await response.json();
    print(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const dataHandler = {
  get: (target, prop) => {
    print(`Getting property '${prop}'`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  },
};

const data = new Proxy({}, dataHandler);
data.name = 'JavaScript';
print(data.name);

 
class Animal {
  static sound() {
    return 'Some generic sound';
  }

  makeSound() {
    print(Animal.sound());
  }
}

class Dog extends Animal {
  static sound() {
    return 'Woof';
  }

  makeSound() {
    print(Dog.sound());
  }
}

const myDog = new Dog();
myDog.makeSound();  

 
const createMultiplier = (factor) => (number) => number * factor;

const doubler = createMultiplier(2);
const tripler = createMultiplier(3);

print(doubler(4));  
print(tripler(4));  

 
fetchData('https://api.example.com/data');

 
console.log(calculate({ op: 'add', a