 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const measureTime = (fn) => async (...args) => {
  const start = performance.now();
  const result = await fn(...args);
  const end = performance.now();
  print(`Time taken: ${end - start}ms`);
  return result;
};

 
const createTracer = (target) => new Proxy(target, {
  get(obj, prop) {
    print(`Accessed property: ${String(prop)}`);
    return obj[prop];
  }
});

 
const multiplier = (x) => (y) => x * y;
const double = multiplier(2);
const triple = multiplier(3);

 
function* fibonacci(n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

 
const main = async () => {
  const tracedObj = createTracer({ a: 1, b: 2, c: 3 });
  print(tracedObj.a, tracedObj.b, tracedObj.c);

  print('Double 4:', double(4));
  print('Triple 5:', triple(5));

  print('Fibonacci sequence:');
  for (const num of fibonacci(10)) {
    print(num);
  }

  const timedFetch = measureTime(fetchData);
  await timedFetch('https://jsonplaceholder.typicode.com/posts/1');
};

main();
