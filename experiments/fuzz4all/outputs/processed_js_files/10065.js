 

function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  while (limit-- > 0) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

async function fetchSquare(number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (number < 0) reject('Negative number!');
      resolve(number * number);
    }, 500);
  });
}

async function computeFibonacciSquares(n) {
  const results = [];
  const fibonacciGen = fibonacciGenerator(n);

  for (const num of fibonacciGen) {
    try {
      const square = await fetchSquare(num);
      results.push(square);
    } catch (error) {
      console.error(error);
    }
  }
  
  return results;
}

(async () => {
  const squares = await computeFibonacciSquares(10);
  print('Squares of Fibonacci numbers:', squares);
})();
