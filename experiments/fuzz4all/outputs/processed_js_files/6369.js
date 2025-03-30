 

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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const complexFunction = async () => {
  print("Start");
  
  await delay(1000);

  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  const sum = numbers.reduce((acc, val) => acc + val, 0);

  const result = `Sum of numbers 1-10 is: ${sum}`;

  return new Proxy(result, {
    get(target, prop) {
      if (prop === 'length') return target.length;
      return target[prop];
    },
    set() {
      throw new Error("Can't modify result");
    }
  });
}

const init = async () => {
  const emitter = new EventEmitter();
  
  emitter.on('completed', result => {
    print(`Completed: ${result}`);
    print(`Result length: ${result.length}`);
  });

  try {
    const result = await complexFunction();
    emitter.emit('completed', result);
  } catch (error) {
    console.error("Error:", error);
  }
};

init();
