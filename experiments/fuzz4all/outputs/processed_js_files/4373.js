class AsyncEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  async emit(event, ...args) {
    if (!this.events.has(event)) return;
    const promises = this.events.get(event).map(listener => listener(...args));
    await Promise.all(promises);
  }
}

const fetchJson = async url => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const userIdList = [1, 2, 3];
const emitter = new AsyncEmitter();

emitter.on('data', async (userData) => {
  print('User Data:', userData);
   
  await new Promise(resolve => setTimeout(resolve, 1000));  
  print('Async operation completed for', userData.name);
});

emitter.on('error', (error) => {
  console.error('Error fetching data:', error);
});

(async () => {
  for (const userId of userIdList) {
    try {
      const userData = await fetchJson(`https: 
      await emitter.emit('data', userData);
    } catch (error) {
      emitter.emit('error', error);
    }
  }
})();
