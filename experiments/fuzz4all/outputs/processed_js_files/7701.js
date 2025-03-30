class AsyncResource {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }
}

const debounce = (func, delay) => {
  let debounceTimer;
  return function(...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const memoize = (func) => {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Returning cached result');
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
};

const resource = new AsyncResource('https://api.example.com/data');

(async () => {
  try {
    const data = await resource.fetchData();
    print('Fetched data:', data);

    const processData = debounce((data) => {
      print('Processing data:', data);
    }, 500);

    const expensiveCalculation = memoize((num) => {
      print('Performing expensive calculation...');
      return num * num;
    });

    processData(data);
    print('Expensive calculation result:', expensiveCalculation(5));
    print('Expensive calculation result:', expensiveCalculation(5));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
