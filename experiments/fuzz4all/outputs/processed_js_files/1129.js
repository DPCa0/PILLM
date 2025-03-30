class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(subscriber) {
    this.subscribers.add(subscriber);
  }
  
  unsubscribe(subscriber) {
    this.subscribers.delete(subscriber);
  }
  
  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const delayedExecution = async (delay, fn) => {
  return new Promise(resolve => setTimeout(() => resolve(fn()), delay));
};

const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

(async function main() {
  const observable = new Observable();

  const subscriber = debounce(data => {
    print('Data received:', data);
  }, 500);

  observable.subscribe(subscriber);

  try {
    const data = await delayedExecution(2000, () => fetchData('https://jsonplaceholder.typicode.com/todos/1'));
    observable.notify(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  observable.unsubscribe(subscriber);
})();
