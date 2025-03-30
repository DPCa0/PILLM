 
const sumAll = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);

 
const handler = {
  set: (target, property, value) => {
    if (typeof value !== 'number' || value < 0) {
      print(`Invalid attempt to set ${property} to ${value}`);
      return false;
    }
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const numbers = new Proxy({}, handler);

 
const fetchNumber = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(42), 1000));
};

 
class Calculator {
  static async calculate() {
    const num = await fetchNumber();
    numbers.a = num;
    numbers.b = 8;
    numbers.c = 12;
    print(`Sum: ${sumAll(numbers.a, numbers.b, numbers.c)}`);
  }
}

 
const { log } = console;
log(`Calculating sum using advanced JavaScript features...`);
Calculator.calculate();

 
const secret = Symbol('secret');

const obj = {
  [secret]: 'hiddenValue'
};

 
log(`Accessing a symbol property: ${obj[secret]}`);
