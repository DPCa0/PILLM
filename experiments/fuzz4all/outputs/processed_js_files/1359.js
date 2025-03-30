(async () => {
   
  function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

   
  async function fetchFibonacci(limit) {
    const fibo = fibonacciGenerator();
    const result = [];
    for await (const num of fibo) {
      if (num > limit) break;
      result.push(num);
    }
    return result;
  }

   
  const [fibsUpTo100, fibsUpTo1000] = await Promise.all([
    fetchFibonacci(100),
    fetchFibonacci(1000)
  ]);

   
  const [firstFibs, ...restFibs] = [...new Set([...fibsUpTo100, ...fibsUpTo1000])];

   
  const finalResult = { firstFibs, fibs: restFibs };

   
  print(`Fibonacci numbers computed: ${JSON.stringify(finalResult, null, 2)}`);
})();
