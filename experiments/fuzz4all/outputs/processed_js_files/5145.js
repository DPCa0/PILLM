class Fibonacci {
  constructor(limit) {
    this.limit = limit;
  }
  
  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (a <= this.limit) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

const cache = new Proxy({}, {
  get: (target, name) => name in target ? target[name] : `No entry for ${name}`
});

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

(async () => {
  print([...new Fibonacci(21)]);  
  cache['data'] = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print(cache['data']);  
  print(cache['missing']);  
})();
