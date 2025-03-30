 

class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
  const { signal } = options;
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
    new Promise((_, reject) => 
      signal && signal.addEventListener('abort', () => reject(new Error('Request aborted')))
    )
  ]);
};

const executeParallel = async (tasks) => {
  const results = await Promise.allSettled(tasks.map(task => task()));
  return results.map(result => result.status === 'fulfilled' ? result.value : result.reason);
};

const asyncFunctionFactory = (index) => async () => {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000));  
  return `Task ${index} completed`;
};

 
const emitter = new EventEmitter();
emitter.on('completed', result => print(`Listener received: ${result}`));

 
fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', {}, 3000)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));

 
const taskArray = Array.from({ length: 5 }, (_, i) => asyncFunctionFactory(i));
executeParallel(taskArray)
  .then(results => results.forEach(result => emitter.emit('completed', result)));
