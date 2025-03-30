class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

function* fibonacci(n) {
  let [a, b] = [0, 1];
  while (n-- > 0) {
    yield a;
    [a, b] = [b, a + b];
  }
}

(async function main() {
  const eventEmitter = new EventEmitter();
  eventEmitter.on('data', data => print('Data received:', data));

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    eventEmitter.emit('data', data);
  } catch (error) {
    console.error('Fetch Error:', error);
  }

  print('Fibonacci Sequence:');
  for (const num of fibonacci(10)) {
    print(num);
  }
})();
