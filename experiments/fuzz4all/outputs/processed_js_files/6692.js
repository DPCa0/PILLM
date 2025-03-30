 
const asyncOperation = () => new Promise((resolve) => {
  const delay = Math.floor(Math.random() * 1000);
  setTimeout(() => resolve(`Completed in ${delay}ms`), delay);
});

 
async function handleAsyncOperations() {
  const operations = Array.from({ length: 5 }, asyncOperation);
  
  try {
    const results = await Promise.all(operations);
    print('All operations completed:');
    results.forEach((result, index) => print(`Operation ${index + 1}: ${result}`));
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
function complexDestructuring({ a, b: { c, ...restB }, ...restA }) {
  print('a:', a);
  print('c:', c);
  print('rest of b:', restB);
  print('rest of a:', restA);
}

 
const createCounter = (initialValue = 0) => {
  let count = initialValue;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
};

 
(async () => {
  print('--- Start of Advanced JavaScript Program ---');

  await handleAsyncOperations();

  print('\nDemonstrating complex destructuring:');
  const complexObject = { a: 1, b: { c: 2, d: 3, e: 4 }, f: 5, g: 6 };
  complexDestructuring(complexObject);

  print('\nUsing a counter created with closures:');
  const counter = createCounter();
  print('Initial count:', counter.getCount());
  print('After increment:', counter.increment());
  print('After another increment:', counter.increment());
  print('After decrement:', counter.decrement());

  print('--- End of Advanced JavaScript Program ---');
})();
