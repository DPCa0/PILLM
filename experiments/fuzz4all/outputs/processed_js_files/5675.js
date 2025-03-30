 

 
const asyncOperation = (value, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(value), delay));

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Property "${prop}" accessed`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new ReferenceError(`Property "${prop}" does not exist`);
    }
  },
  set: function(target, prop, value, receiver) {
    if (typeof value === 'string') {
      print(`Setting "${prop}" to "${value}"`);
      return Reflect.set(target, prop, value, receiver);
    } else {
      throw new TypeError(`Property "${prop}" must be a string`);
    }
  }
};

 
const person = new Proxy({ name: "Alice", occupation: "Engineer" }, handler);

async function complexAsyncFunction() {
  try {
     
    print(`Name: ${person.name}`);
    print(`Occupation: ${person.occupation}`);

     
    person.name = "Bob";

     
    const result1 = await asyncOperation('First Result', 1000);
    print(result1);

    const result2 = await asyncOperation('Second Result', 1500);
    print(result2);

     
     
    person.occupation = 42;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

complexAsyncFunction();
