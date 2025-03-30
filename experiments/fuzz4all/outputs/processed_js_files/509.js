 
const arrayHandler = {
  get(target, property) {
    if (typeof property === 'string' && !isNaN(property)) {
      print(`Accessing index ${property}: ${target[property]}`);
    }
    return target[property];
  },
  set(target, property, value) {
    print(`Setting index ${property} to ${value}`);
    target[property] = value;
    return true;
  },
  deleteProperty(target, property) {
    print(`Deleting index ${property}`);
    delete target[property];
    return true;
  }
};

let arr = new Proxy([], arrayHandler);

 
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      const result = fn(...args);
      print(`Memoizing result for args ${key}: ${result}`);
      cache.set(key, result);
    }
    return cache.get(key);
  }
}

 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

const memoizedFib = memoize((n) => {
  const fib = fibonacci();
  let result;
  for (let i = 0; i <= n; i++) {
    result = fib.next().value;
  }
  return result;
});

 
arr.push(10);
arr.push(20);
print(arr[0]);
delete arr[1];

print('Fibonacci(5):', memoizedFib(5));
print('Fibonacci(7):', memoizedFib(7));
print('Fibonacci(5) (cached):', memoizedFib(5));  
