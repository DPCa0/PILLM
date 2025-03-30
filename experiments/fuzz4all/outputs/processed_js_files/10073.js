 
const handler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Called method ${prop} with arguments: ${JSON.stringify(args)}`);
        return Reflect.apply(target[prop], target, args);
      };
    } else {
      print(`Accessed property ${prop} with value: ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    }
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to value: ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const person = {
  name: 'Alice',
  age: 30,
  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
};

const observablePerson = new Proxy(person, handler);

 
const { name, ...rest } = observablePerson;
print(`Destructured name: ${name}`);
print(`Rest properties: ${JSON.stringify(rest)}`);

 
const fetchData = async () => {
  print('Fetching data...');
  return new Promise((resolve) => setTimeout(() => resolve('Data fetched!'), 1000));
};

(async () => {
  const data = await fetchData();
  print(data);

   
  function* numberGenerator(limit) {
    let number = 0;
    while (number < limit) {
      yield number++;
    }
  }

  for (let num of numberGenerator(5)) {
    print(`Generated number: ${num}`);
  }

  observablePerson.name = 'Bob';
  print(observablePerson.greet());
})();
