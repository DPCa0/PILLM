Certainly! Here's a complex JavaScript program utilizing advanced features like Promises, async/await, generators, and destructuring assignment:

// Generator function to yield values
function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  while (limit--) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

// Async function utilizing Promises
async function processFibonacciNumbers(limit) {
  // Create a promise that resolves after a delay
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const fibonacciNumbers = [];

  for (let num of fibonacciGenerator(limit)) {
    fibonacciNumbers.push(num);
    await delay(100);  // Simulate a delay
  }

  return fibonacciNumbers;
}

// IIFE (Immediately Invoked Function Expression) with async/await
(async () => {
  try {
    const limit = 10;
    print(`Calculating Fibonacci sequence up to ${limit} numbers...`);
    const fibonacciSequence = await processFibonacciNumbers(limit);

    print(`Fibonacci Sequence:`);
    print(fibonacciSequence);
    
    // Destructuring to get specific numbers
    const [first, second, third, ...rest] = fibonacciSequence;
    print(`First three numbers: ${first}, ${second}, ${third}`);
    print(`Remaining numbers: ${rest.join(', ')}`);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

This script calculates the Fibonacci sequence using a generator function and processes the sequence asynchronously with delays using Promises and async/await. It demonstrates the use of destructuring to extract values from arrays.