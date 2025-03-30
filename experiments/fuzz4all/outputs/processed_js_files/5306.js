 

 
export function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
import { fibonacci, delay } from './utils.js';

async function displayFibonacci() {
  const limit = 10;
  const gen = fibonacci(limit);

  for (let value of gen) {
    print(value);
    await delay(500);  
  }
}

 
(async () => {
  print('Starting Fibonacci Sequence:');
  await displayFibonacci();
  print('Finished Fibonacci Sequence');
})();
