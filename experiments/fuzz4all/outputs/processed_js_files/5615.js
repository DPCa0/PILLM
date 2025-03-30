class AsyncEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  async emit(event, ...args) {
    if (!this.events[event]) return;
    await Promise.all(this.events[event].map(listener => listener(...args)));
  }
}

 
const emitter = new AsyncEventEmitter();

 
emitter.on('data', async (data) => {
  const processed = await new Promise((resolve) => setTimeout(() => resolve(data.toUpperCase()), 500));
  print('Processed:', processed);
});

emitter.on('data', async (data) => {
  const reversed = await new Promise((resolve) => setTimeout(() => resolve(data.split('').reverse().join('')), 300));
  print('Reversed:', reversed);
});

 
const complexFunction = async ({name, message}) => {
  await emitter.emit('data', `Hello ${name}, ${message}`);
};

 
(async () => {
  await complexFunction({name: 'Alice', message: 'welcome to the async world'});
})();
