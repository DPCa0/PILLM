(async () => {
   
  const simulateAsyncOperation = (ms) => new Promise(resolve => setTimeout(resolve, ms));

   
  function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    for(let i = 0; i < limit; i++) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

   
  async function computeFibonacciSeries(limit) {
    const results = [];
    for(const num of fibonacci(limit)) {
      await simulateAsyncOperation(200);  
      results.push(num);
    }
    return results;
  }

   
  const fibMap = new Map();

   
  const main = async () => {
    const limit = 10;
    const fibSeries = await computeFibonacciSeries(limit);

     
    const handler = {
      get: (target, prop) => prop in target ? target[prop] : "Value not available"
    };

    const proxiedFibMap = new Proxy(fibMap, handler);

    fibSeries.forEach((value, index) => fibMap.set(index + 1, value));

     
    const [first, second, ...rest] = fibSeries;
    print(`First: ${first}, Second: ${second}`);
    print(`Rest of series: ${rest}`);

     
    print(`Value at position 5: ${proxiedFibMap.get(5) ?? 'Unknown'}`);
    print(`Value at position 11: ${proxiedFibMap.get(11) ?? 'Unknown'}`);
  };

   
  main();
})();
