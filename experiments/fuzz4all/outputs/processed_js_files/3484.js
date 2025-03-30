class Calculator {
   
  #history = [];

   
  calculate(a, b, operator) {
     
    const operations = {
      '+': (x, y) => x + y,
      '-': (x, y) => x - y,
      '*': (x, y) => x * y,
      '/': (x, y) => x / y,
    };

    if (operations[operator]) {
      const result = operations[operator](a, b);
      this.#addHistory({ a, b, operator, result });
      return result;
    } else {
      throw new Error('Invalid operator');
    }
  }

   
  #addHistory(entry) {
    this.#history.push(entry);
  }

   
  *getHistory() {
    for (const entry of this.#history) {
      yield `${entry.a} ${entry.operator} ${entry.b} = ${entry.result}`;
    }
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      throw new ReferenceError(`Property '${prop}' not found`);
    }
  }
};

const calc = new Proxy(new Calculator(), handler);

 
try {
  print(calc.calculate(5, 3, '+'));  
  print(calc.calculate(10, 2, '-'));  
  print(calc.calculate(6, 3, '*'));  

  for (let entry of calc.getHistory()) {
    print(entry);
  }
} catch (error) {
  console.error(error.message);
}
