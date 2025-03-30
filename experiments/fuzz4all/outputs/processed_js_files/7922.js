 
async function* asyncFibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
    await new Promise(resolve => setTimeout(resolve, 50));  
  }
}

 
async function getFibonacciWithResults(limit) {
  const fibResults = new Map();
  const promises = [];
  for await (const num of asyncFibonacci(limit)) {
    const promise = new Promise((resolve) => {
      const isEven = num % 2 === 0;
      resolve({ num, isEven });
    });
    promises.push(promise);
  }

  const results = await Promise.allSettled(promises);

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      const { num, isEven } = result.value;
      fibResults.set(num, isEven ? 'Even' : 'Odd');
    }
  });

  return fibResults;
}

 
function createLoggedFibonacciMap(fibMap) {
  return new Proxy(fibMap, {
    get(target, prop, receiver) {
      print(`Accessing Fibonacci number: ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
  });
}

 
(async () => {
  const limit = 100;
  const fibResults = await getFibonacciWithResults(limit);
  const loggedFibMap = createLoggedFibonacciMap(fibResults);

  print("Fibonacci numbers with even/odd classification:");
  for (const [num, classification] of loggedFibMap) {
    print(`${num} is ${classification}`);
  }
})();
