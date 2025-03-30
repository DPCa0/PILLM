Certainly! Here is a JavaScript program that demonstrates the use of some advanced features such as Promises, async/await, generators, and destructuring:

 
const asyncOperation = (value, delay) => 
  new Promise(resolve => setTimeout(() => resolve(value), delay));

 
function* promiseGenerator() {
  yield asyncOperation('Result 1', 1000);
  yield asyncOperation('Result 2', 2000);
  yield asyncOperation('Result 3', 1500);
}

 
async function handleGenerator(generator) {
  const results = [];
  
  for (let promise of generator) {
     
    const result = await promise;
    results.push(result);
  }
  
  return results;
}

 
(async () => {
  const gen = promiseGenerator();
  const results = await handleGenerator(gen);
  const [first, second, third] = results;

  print(`Destructured Results:`, first, second, third);
})();

This program uses a generator function to create a sequence of promises simulating asynchronous operations. The `handleGenerator` function iterates through the promises, awaiting each one in turn, and collects the results. Finally, the results are destructured into individual variables and logged to the console.