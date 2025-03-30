class AsyncNumberGenerator {
  constructor() {
    this.numbers = [];
  }

  async *generateRandomNumbers(limit) {
    for (let i = 0; i < limit; i++) {
       
      const number = await new Promise(resolve => 
        setTimeout(() => resolve(Math.floor(Math.random() * 100)), 100)
      );
      yield number;
    }
  }

  async populateNumbers(limit) {
    for await (let num of this.generateRandomNumbers(limit)) {
      this.numbers.push(num);
    }
  }

  *[Symbol.iterator]() {
    for (let num of this.numbers) {
      yield num;
    }
  }
}

(async () => {
  const generator = new AsyncNumberGenerator();
  await generator.populateNumbers(5);
  
  print('Generated Numbers:', ...generator);

   
  const uniqueNumbers = new Set(generator);
  print('Unique Numbers:', ...uniqueNumbers);
  
   
  const squaredNumbers = [...uniqueNumbers].map(num => num ** 2);
  print('Squared Numbers:', squaredNumbers);

   
  const sumOfSquares = squaredNumbers.reduce((acc, num) => acc + num, 0);
  print('Sum of Squares:', sumOfSquares);

   
  const handler = {
    get: (target, prop) => {
      if (prop === 'push') {
        return (...args) => {
          print(`Adding ${args[0]} to numbers`);
          return target[prop](...args);
        };
      }
      return target[prop];
    }
  };

  const proxyNumbers = new Proxy(generator.numbers, handler);
  proxyNumbers.push(100);  
  print('Numbers after push:', proxyNumbers);
})();
