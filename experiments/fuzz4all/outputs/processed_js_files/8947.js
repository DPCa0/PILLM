class AsyncDataHandler {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData(endpoint) {
    const response = await fetch(`${this.apiUrl}${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }

  static debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
}

function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const dynamicImportFeature = async () => {
  if (Math.random() > 0.5) {
    const { join } = await import('path');
    print(join('Advanced', 'JavaScript', 'Features'));
  } else {
    print('No dynamic import executed this time.');
  }
};

const dataHandler = new AsyncDataHandler('https://api.example.com');
const debouncedFetch = AsyncDataHandler.debounce(dataHandler.fetchData.bind(dataHandler), 300);

const fibGen = fibonacciGenerator();
print(fibGen.next().value);  
print(fibGen.next().value);  
print(fibGen.next().value);  
print(fibGen.next().value);  

dynamicImportFeature();
