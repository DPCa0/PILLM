 

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const handler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const data = { key: 'value' };
const proxyData = new Proxy(data, handler);

 
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => `${result}${string}<strong>${values[i] || ''}</strong>`, '');
}

const name = 'JavaScript';
print(highlight`Hello, ${name}! Welcome to advanced programming.`);

 
const complexObject = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...rest } = complexObject;
print('Destructured values:', a, b);
print('Remaining object:', rest);

 
const apiURL = 'https://jsonplaceholder.typicode.com/todos/1';
fetchData(apiURL).then((result) => print('Fetched Data:', result));

 
const uniqueKey = Symbol('unique');
const myObject = {
  [uniqueKey]: 'This is a unique value'
};

print('Symbol-keyed property:', myObject[uniqueKey]);

 
class AdvancedFeatures {
  static staticMethod() {
    print('Static method called');
  }

  #privateField = 42;

  getPrivateField() {
    return this.#privateField;
  }
}

AdvancedFeatures.staticMethod();
const instance = new AdvancedFeatures();
print('Private field value:', instance.getPrivateField());
