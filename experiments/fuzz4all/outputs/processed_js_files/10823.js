class FibonacciSequence {
  constructor(max = 100) {
    this.max = max;
    this[Symbol.iterator] = this.generateFibonacci;
  }
  
  *generateFibonacci() {
    let [prev, curr] = [0, 1];
    while (curr <= this.max) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

const debounce = (fn, delay) => {
  let timeoutId;
  return function(...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const memoize = (fn) => {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

const expensiveCalculation = memoize((num) => {
  print('Calculating...');
  return num * num;
});

 
const fibSeq = new FibonacciSequence(200);
print([...fibSeq]);  

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce(async (event) => {
  const data = await fetchData(`https: 
  print('Search results:', data);
}, 300));

 
print(expensiveCalculation(10));  
print(expensiveCalculation(10));  
