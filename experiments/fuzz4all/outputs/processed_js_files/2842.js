 

function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (limit--) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

async function calculateFibonacci(n) {
  const sequence = [];
  for (let num of fibonacci(n)) {
    sequence.push(num);
  }
  return sequence;
}

async function displayFibonacci(n) {
  try {
    const sequence = await calculateFibonacci(n);
    print(`First ${n} Fibonacci numbers:`, sequence);
  } catch (error) {
    console.error('Error:', error);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
  print('Starting computation...');
  await delay(1000);  
  await displayFibonacci(10);
  print('Computation finished.');
})();
