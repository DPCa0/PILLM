 

function* fibonacciGenerator() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fibonacciAsync = async (n) => {
  const fib = fibonacciGenerator();
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(fib.next().value);
  }
  return result;
};

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessed property: ${prop}`);
      return target[prop];
    }
    return `Property ${prop} not found`;
  }
};

const proxiedMath = new Proxy(Math, handler);

const calculateFibonacciAndLog = async () => {
  try {
    const numbers = await fibonacciAsync(10);
    print('Fibonacci Series:', numbers);

    print('Square root of 16:', proxiedMath.sqrt(16));
    print('Non-existent property:', proxiedMath.nonExistent);
  } catch (error) {
    console.error('Error:', error);
  }
};

calculateFibonacciAndLog();
