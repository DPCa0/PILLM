class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.#listeners.has(event)) {
      for (const listener of this.#listeners.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listener) {
    if (this.#listeners.has(event)) {
      this.#listeners.get(event).delete(listener);
    }
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const dataEmitter = new EventEmitter();

const complexOperation = async (url) => {
  try {
    const data = await fetchData(url);
    dataEmitter.emit('data', data);
  } catch (error) {
    dataEmitter.emit('error', error);
  }
};

 
dataEmitter.on('data', (data) => print('Received data:', data));
dataEmitter.on('error', (error) => console.error('Error:', error));

complexOperation('https://jsonplaceholder.typicode.com/posts/1');

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  await delay(2000);
  print('Executing after a delay!');
})();
