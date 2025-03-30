 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

 
function measureTime(fn) {
  return async function(...args) {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    print(`Execution time: ${(end - start).toFixed(2)} ms`);
    return result;
  };
}

 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const obj = { a: 1, b: 2, c: 3 };
const handler = {
  get(target, prop) {
    print(`Accessing property '${prop}' with value ${target[prop]}`);
    return Reflect.get(target, prop);
  }
};
const proxyObj = new Proxy(obj, handler);

 
(async () => {
  try {
    const data = await measureTime(fetchData)('https://jsonplaceholder.typicode.com/posts/1');
    print('Data fetched:', data);

    const fib = fibonacci();
    print('First 5 Fibonacci numbers:');
    for (let i = 0; i < 5; i++) {
      print(fib.next().value);
    }

    print('Accessing object properties through proxy:');
    print(proxyObj.a);
    print(proxyObj.b);
    print(proxyObj.c);

  } catch (error) {
    console.error('Error:', error);
  }
})();
