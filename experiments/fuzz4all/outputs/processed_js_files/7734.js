 
const getRandomNumberWithDelay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 100);
      resolve(randomNum);
    }, 1000);
  });
};

 
const computeFactorial = async () => {
  try {
    const number = await getRandomNumberWithDelay();
    print(`Random Number: ${number}`);

     
    const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1));

    const result = factorial(number);
    print(`Factorial of ${number} is: ${result}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

 
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : 'Infinity'),
};

const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Accessing ${prop} method`);
      return target[prop];
    }
    return `No such method: ${prop}`;
  },
};

const proxyCalculator = new Proxy(calculator, handler);

 
print(proxyCalculator.add(10, 5));       
print(proxyCalculator.subtract(10, 5));  
print(proxyCalculator.multiply(10, 5));  
print(proxyCalculator.divide(10, 5));    

 
computeFactorial();
