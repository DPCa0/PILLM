 

 
(async function main() {
   
  const uniqueNumbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const numberMap = new Map();

  uniqueNumbers.forEach(num => {
    numberMap.set(num, num * num);  
  });

   
  function* numberGenerator() {
    yield* [...uniqueNumbers].filter(num => num % 2 === 0);
  }

  const evenNumbers = [...numberGenerator()];
  print('Even Numbers:', evenNumbers);

   
  const squarePromises = evenNumbers.map(async num => {
     
    return new Promise(resolve => {
      setTimeout(() => resolve(numberMap.get(num)), 100);
    });
  });

  const squares = await Promise.all(squarePromises);
  print('Squares of Even Numbers:', squares);

   
  const handler = {
    get(target, prop, receiver) {
      print(`Accessed property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
  };

  const proxiedMap = new Proxy(numberMap, handler);
   
  print('Proxied Access:', proxiedMap.get(4));

   
  class Calculator {
    #factor = 2;
    
    multiply(value) {
      return this.#privateMultiply(value);
    }

    #privateMultiply(value) {
      return value * this.#factor;
    }
  }

  const calc = new Calculator();
  print('Multiplication Result:', calc.multiply(10));
})();
