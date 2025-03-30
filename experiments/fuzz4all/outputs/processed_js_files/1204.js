class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const fetchDataMemoized = memoize(fetchData);

const obs = new Observable();
obs.subscribe(data => print('Subscriber 1:', data));
obs.subscribe(data => print('Subscriber 2:', data));

const debouncedNotify = debounce((data) => obs.notify(data), 300);

async function getDataAndNotify(url) {
  try {
    const data = await fetchDataMemoized(url);
    debouncedNotify(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
 
