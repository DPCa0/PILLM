const crypto = require('crypto');

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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return await response.json();
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

function generateSecureToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) return reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}

(async () => {
  const eventEmitter = new EventEmitter();
  eventEmitter.on('dataFetched', (data) => {
    print('Data fetched:', data);
  });

  eventEmitter.on('tokenGenerated', (token) => {
    print('Secure token:', token);
  });

  try {
    const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1');
    eventEmitter.emit('dataFetched', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  try {
    const token = await generateSecureToken();
    eventEmitter.emit('tokenGenerated', token);
  } catch (error) {
    console.error('Error generating token:', error);
  }
})();
