const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

class Observer {
  constructor() {
    this.subscribers = [];
  }
  subscribe(fn) {
    this.subscribers.push(fn);
  }
  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn);
  }
  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}

const observer = new Observer();

observer.subscribe((data) => print('Subscriber 1:', data));
observer.subscribe((data) => print('Subscriber 2:', data));

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    observer.notify(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

const memoize = (fn) => {
  const cache = new Map();
  return (n) => {
    if (cache.has(n)) return cache.get(n);
    const result = fn(n);
    cache.set(n, result);
    return result;
  };
};

const memoizedFactorial = memoize(factorial);

print(memoizedFactorial(5));   
print(memoizedFactorial(6));   
