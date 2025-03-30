class Emitter {
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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* generateNumbers() {
  let i = 0;
  while (true) {
    await delay(100);
    yield i++;
  }
}

(async () => {
  const emitter = new Emitter();
  emitter.on('number', num => print(`Received number: ${num}`));

  const numberGen = generateNumbers();

  for await (const num of numberGen) {
    emitter.emit('number', num);
    if (num >= 10) break;  
  }
})();
