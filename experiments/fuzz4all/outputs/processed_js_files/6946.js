 

function* fibonacciGenerator() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

async function main() {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);

    const fibGen = fibonacciGenerator();
    for (let i = 0; i < 10; i++) {
      print('Fibonacci:', fibGen.next().value);
    }
    
    const promise1 = new Promise((resolve) => setTimeout(() => resolve('First Promise Resolved'), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve('Second Promise Resolved'), 2000));
    
    const results = await Promise.all([promise1, promise2]);
    print('Promise Results:', results);

    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    const transformed = Array.from(map).map(([key, value]) => `${key}: ${value * 2}`);
    print('Transformed Map:', transformed);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
