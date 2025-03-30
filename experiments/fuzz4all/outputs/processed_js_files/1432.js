 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (limit--) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

async function* asyncFibonacci(limit) {
  for (const num of fibonacci(limit)) {
    await delay(100);
    yield num;
  }
}

async function calculateAndLogFibonacci(limit) {
  print(`Calculating Fibonacci sequence for limit: ${limit}`);
  const sequence = [];
  for await (const num of asyncFibonacci(limit)) {
    sequence.push(num);
    print(`Generated: ${num}`);
  }
  print(`Fibonacci sequence: [${sequence.join(', ')}]`);
}

(async () => {
  try {
    await calculateAndLogFibonacci(10);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
