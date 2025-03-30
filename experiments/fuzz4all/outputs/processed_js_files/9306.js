Certainly! Here's a JavaScript program that utilizes advanced features such as asynchronous programming, generators, destructuring, and promises.

// A utility to simulate an asynchronous operation using a Promise
const asyncOperation = (value, delay) => 
  new Promise(resolve => setTimeout(() => resolve(value), delay));

// An async generator to yield values from an asynchronous operation
async function* generateAsyncSequence() {
  const values = [1, 2, 3];
  for (const value of values) {
    yield await asyncOperation(value * 10, 1000); // Simulate async operation
  }
}

// Function that consumes the async generator and logs results
async function processAsyncSequence() {
  for await (const result of generateAsyncSequence()) {
    print(`Processed value: ${result}`);
  }
}

// Object with nested properties and arrays
const complexObject = {
  a: 10,
  b: {
    c: [1, 2, 3],
    d: {
      e: 'hello'
    }
  }
};

// Destructuring to extract nested properties
const { 
  a, 
  b: { 
    c: [first, second, third], 
    d: { e: nestedValue } 
  } 
} = complexObject;

print(`Extracted values: a=${a}, first=${first}, second=${second}, nestedValue=${nestedValue}`);

// Immediately Invoked Function Expression (IIFE) with async/await
(async () => {
  print('Starting async sequence processing...');
  await processAsyncSequence();
  print('Finished processing!');
})();

This code demonstrates a combination of asynchronous programming with promises and generators, destructuring of complex objects, and the usage of an immediately invoked function expression (IIFE) to handle asynchronous flow in a structured manner.