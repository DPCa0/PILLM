 
function log(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args) {
    print(`Calling ${name} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return target[prop];
    }
    return `Property ${prop} doesn't exist`;
  },
  set(target, prop, value) {
    if (typeof value === 'number') {
      print(`Setting ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
    console.warn(`Cannot set ${prop} to non-number value`);
    return false;
  }
};

const obj = new Proxy({}, handler);

// Utilize promises and async/await with error handling
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print('Data fetched:', data);
    return data;
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
}

// Demonstrate class with static methods and getters/setters
class Calculator {
  static history = [];

  constructor() {
    this._result = 0;
  }

  @log
  add(x) {
    this._result += x;
    Calculator.history.push(`Added ${x}`);
  }

  @log
  subtract(x) {
    this._result -= x;
    Calculator.history.push(`Subtracted ${x}`);
  }

  get result() {
    return this._result;
  }

  set result(value) {
    if (typeof value === 'number') {
      this._result = value;
    } else {
      console.error('Result must be a number');
    }
  }

  static getHistory() {
    return this.history;
  }
}

// Demonstrate usage
obj.a = 5;     // Valid operation
obj.b = 'hi';  // Invalid operation
print(obj.a);
print(obj.c);

const calc = new Calculator();
calc.add(10);
calc.subtract(5);
calc.result = 20;  // Valid
calc.result = 'abc';   
console