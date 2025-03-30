 
import { performance, PerformanceObserver } from 'perf_hooks';

 
const fetchData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const handler = {
  get: (obj, prop) => {
    print(`Accessing property "${prop}"`);
    return prop in obj ? obj[prop] : 37;
  }
};

const proxy = new Proxy({ a: 1, b: 2 }, handler);

 
const obs = new PerformanceObserver((items) => {
  print(items.getEntries()[0].duration);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

performance.mark('A');

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);
  } catch (e) {
    print('Fetch error:', e);
  }

  const fib = fibonacci();
  print('Fibonacci:', fib.next().value);  
  print('Fibonacci:', fib.next().value);  

  print('Proxy Access:', proxy.a);  
  print('Proxy Access:', proxy.unknown);  

  performance.mark('B');
  performance.measure('A to B', 'A', 'B');
})();
