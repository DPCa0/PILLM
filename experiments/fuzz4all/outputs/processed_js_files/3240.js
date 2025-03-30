class Calculator {
  constructor() {
    this.result = 0;
  }

  add(x) {
    this.result += x;
    return this;
  }

  subtract(x) {
    this.result -= x;
    return this;
  }

  multiply(x) {
    this.result *= x;
    return this;
  }

  divide(x) {
    if (x !== 0) {
      this.result /= x;
    } else {
      console.error("Cannot divide by zero!");
    }
    return this;
  }

  clear() {
    this.result = 0;
    return this;
  }

  getResult() {
    return this.result;
  }
}

const asyncOperation = (calc) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      calc.add(10).subtract(2).multiply(5).divide(2);
      resolve(calc.getResult());
    }, 1000);
  });
};

(async () => {
  const calc = new Calculator();
  const result = await asyncOperation(calc);
  print(`The final result is: ${result}`);

   
  const numbers = [1, 2, 3, 4, 5];
  const [first, second, ...rest] = numbers;
  print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
  
   
  const mapExample = new Map();
  mapExample.set('a', 1).set('b', 2).set('c', 3);
  mapExample.forEach((value, key) => {
    print(`${key}: ${value}`);
  });

   
  const handler = {
    get(target, prop, receiver) {
      print(`Getting ${prop}`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    }
  };
  
  const proxyCalc = new Proxy(new Calculator(), handler);
  proxyCalc.add(5);
  print(proxyCalc.getResult());
})();
