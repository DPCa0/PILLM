class Calculator {
  constructor() {
    this.operations = new Map();
    this.memory = 0;
  }

  addOperation(name, fn) {
    if (typeof fn === 'function') {
      this.operations.set(name, fn);
    } else {
      throw new Error('Operation must be a function');
    }
  }

  execute(name, ...args) {
    if (this.operations.has(name)) {
      const result = this.operations.get(name)(...args);
      this.memory = result;  
      return result;
    }
    throw new Error(`Operation ${name} not found`);
  }

  clearMemory() {
    this.memory = 0;
  }

  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

 
const calculatorProxy = new Proxy(new Calculator(), {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling ${prop} with arguments:`, args);
        return target[prop].apply(target, args);
      };
    }
    return target[prop];
  }
});

 
calculatorProxy.addOperation('add', (a, b) => a + b);
calculatorProxy.addOperation('multiply', (a, b) => a * b);

 
print(calculatorProxy.execute('add', 5, 3));  
print(calculatorProxy.execute('multiply', 5, 3));  

 
(async () => {
  const data = await Calculator.fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched data:', data);
})();
