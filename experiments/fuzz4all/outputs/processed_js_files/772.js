 

function* fibonacci(n) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

async function asyncFibonacciSequence(n) {
  let fibSequence = [];
  for (let num of fibonacci(n)) {
    fibSequence.push(await new Promise(resolve => setTimeout(() => resolve(num), 100)));
  }
  return fibSequence;
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing element ${prop}: ${target[prop]}`);
      return target[prop];
    }
    return undefined;
  }
};

(async () => {
  const n = 10;  
  const fibArray = await asyncFibonacciSequence(n);
  const proxiedFibArray = new Proxy(fibArray, handler);

   
  print('Generated Fibonacci sequence:');
  for (let i = 0; i < proxiedFibArray.length; i++) {
    print(proxiedFibArray[i]);
  }
})();
