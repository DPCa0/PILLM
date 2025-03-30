 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
async function fetchFibonacciNumbers(limit) {
  const fibGenerator = fibonacci();
  const results = [];
  for (let i = 0; i < limit; i++) {
    results.push(fibGenerator.next().value);
    await new Promise(resolve => setTimeout(resolve, 100));  
  }
  return results;
}

 
(async () => {
  try {
    const numbers = await fetchFibonacciNumbers(10);
    print('Fetched Fibonacci Numbers:', numbers);

     
    const evensSquaredSum = numbers
      .filter(num => num % 2 === 0)
      .map(num => num ** 2)
      .reduce((acc, num) => acc + num, 0);

    print('Sum of squares of even Fibonacci numbers:', evensSquaredSum);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
