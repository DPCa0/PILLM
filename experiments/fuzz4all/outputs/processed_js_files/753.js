 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop}: ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property ${prop} doesn't exist.`);
      return undefined;
    }
  },
  set(target, prop, value) {
    if (typeof value === 'number' && value > 0) {
      print(`Setting ${prop} to ${value}`);
      target[prop] = value;
      return true;
    } else {
      print(`Invalid value for ${prop}: ${value}`);
      return false;
    }
  }
};

// Create a target object
const targetObject = {
  a: 1,
  b: 2
};

// Create a proxy object
const proxy = new Proxy(targetObject, handler);

// Use Reflect to demonstrate object manipulation
Reflect.set(proxy, 'c', 3); // Valid set
Reflect.set(proxy, 'b', -1); // Invalid set
print(Reflect.get(proxy, 'a')); // Get property
print(Reflect.get(proxy, 'z')); // Attempt to get nonexistent property

// Using Promise with async/await and generator functions
async function* asyncGenerator() {
  yield new Promise((resolve) => setTimeout(() => resolve('First'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Second'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Third'), 1000));
}

(async function () {
  for await (const val of asyncGenerator()) {
    print(val);
  }
})();

// Demonstrate symbol usage and private class fields
const uniqueSym = Symbol('unique');

class MyClass {
  #privateField = 'private';
  [uniqueSym] = 'symbolic';

  getPrivateField() {
    return this.#privateField;
  }

  getSymbolField() {
    return this[uniqueSym];
  }
}

const myInstance = new MyClass();
print(myInstance.getPrivateField());
print(myInstance.getSymbolField());
