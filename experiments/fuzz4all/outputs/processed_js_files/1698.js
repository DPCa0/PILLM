 
function logCalls(fn) {
  return function (...args) {
    print(`Calling ${fn.name} with arguments:`, args);
    const result = fn(...args);
    print(`Result:`, result);
    return result;
  };
}

 
const fibonacci = new Proxy(function (n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}, {
  apply(target, thisArg, argumentsList) {
    const n = argumentsList[0];
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('Fibonacci function requires a non-negative integer');
    }
    return Reflect.apply(target, thisArg, argumentsList);
  }
});

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function main() {
  const loggedFibonacci = logCalls(fibonacci);

  print('Starting calculation...');
  await delay(1000);  

   
  try {
    const result = loggedFibonacci(10);
    print(`Fibonacci(10): ${result}`);
  } catch (e) {
    console.error(e);
  }

  print('Calculation complete.');
}

main();
