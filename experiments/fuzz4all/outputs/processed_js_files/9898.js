 
class InvalidDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidDataError';
  }
}

 
const validator = {
  set(target, property, value) {
    if (property === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new InvalidDataError('Age must be a non-negative number');
    }
    target[property] = value;
    return true;
  }
};

const person = new Proxy({}, validator);

 
function* fibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

 
async function getFibonacciSum(n) {
  const fiboNumbers = [];
  for (const num of fibonacci(n)) {
    fiboNumbers.push(num);
  }
  const sum = fiboNumbers.reduce((acc, num) => acc + num, 0);
  return new Promise((resolve) => setTimeout(() => resolve(sum), 1000));
}

 
(async () => {
  try {
    person.name = 'Alice';
    person.age = 25;  
    print(`Person: ${JSON.stringify(person)}`);

    const sum = await getFibonacciSum(10);
    print(`Sum of first 10 Fibonacci numbers: ${sum}`);
  } catch (error) {
    if (error instanceof InvalidDataError) {
      console.error(`Validation Error: ${error.message}`);
    } else {
      console.error(`Unknown Error: ${error}`);
    }
  }
})();
