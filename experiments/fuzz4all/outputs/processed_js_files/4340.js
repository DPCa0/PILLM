class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  speak() {
    print(`${this.name} barks.`);
  }
}

const dog = new Dog('Rex');
dog.speak();

 
async function fetchData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data fetched!'), 2000);
  });
  
  const data = await promise;
  print(data);
}

fetchData();

 
const set = new Set([1, 2, 3, 4, 5, 5]);
const array = [...set];
print(array);

 
const handler = {
  get(target, prop) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const person = new Proxy({}, handler);
person.name = 'Alice';
print(person.name);

 
const [a = 1, b = 2] = [undefined, 3];
print(a, b);

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => 
    `${result}${string.toUpperCase()}${values[i] || ''}`, '');
}

const name = 'World';
print(tag`Hello, ${name}!`);
