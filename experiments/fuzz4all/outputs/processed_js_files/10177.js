 

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

 
const concatenateStrings = (separator = ', ', ...strings) => {
  return strings.join(separator);
};

print('Concatenated String:', concatenateStrings(' - ', 'JavaScript', 'ES6', 'Features'));

 
class Person {
  #privateField = 'I am private';
  
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static greet() {
    print('Hello from the Person class!');
  }

  getPrivate() {
    return this.#privateField;
  }
}

Person.greet();

const john = new Person('John Doe', 30);
print('Private Field:', john.getPrivate());

 
const target = {
  name: 'Alice',
  age: 25
};

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    } else {
      return `Property "${prop}" is not defined.`;
    }
  },
  set(obj, prop, value) {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);
print(proxy.name);   
print(proxy.height);   
proxy.age = 26;

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
print('Map values:', [...map.values()]);

const set = new Set([1, 2, 3, 2, 1]);
print('Set values:', [...set]);

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

const numbers = numberGenerator