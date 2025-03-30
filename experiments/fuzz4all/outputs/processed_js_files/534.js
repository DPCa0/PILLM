 
class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(fn) {
    this.subscribers.add(fn);
  }

  unsubscribe(fn) {
    this.subscribers.delete(fn);
  }

  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

 
const observable = new Observable();

observable.subscribe(data => print('Subscriber 1:', data));
observable.subscribe(data => print('Subscriber 2:', data));

const debouncedFetch = debounce(async (url) => {
  const data = await fetchData(url);
  if (data) {
    observable.notify(data);
  }
}, 1000);

 
const simulateUserInput = (input) => {
  print(`User input: ${input}`);
  debouncedFetch(`https: 
};

 
simulateUserInput(1);
simulateUserInput(2);
setTimeout(() => simulateUserInput(3), 500);
setTimeout(() => simulateUserInput(4), 2000);
