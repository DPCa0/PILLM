 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const person = {
  firstName: 'John',
  lastName: 'Doe'
};

const handler = {
  get(target, prop) {
    print(`Property '${prop}' has been accessed.`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Property '${prop}' is being set to '${value}'.`);
    return Reflect.set(target, prop, value);
  }
};

const proxiedPerson = new Proxy(person, handler);

 
class Calculator {
  static history = [];

  static add(a, b) {
    const result = a + b;
    this.history.push(`Added ${a} to ${b} and got ${result}`);
    return result;
  }

  static multiply(a, b) {
    const result = a * b;
    this.history.push(`Multiplied ${a} with ${b} and got ${result}`);
    return result;
  }
}

 
async function executeComplexOperations() {
  print('Starting complex operations...');

   
  await Promise.all([delay(1000), delay(2000)]);

   
  print(proxiedPerson.firstName);
  proxiedPerson.lastName = 'Smith';

   
  print(`Sum: ${Calculator.add(3, 5)}`);
  print(`Product: ${Calculator.multiply(4, 7)}`);

  print('Operations completed. History:');
  print(Calculator.history.join('\n'));
}

 
executeComplexOperations();
