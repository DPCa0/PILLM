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
    const listeners = this.events.get(event) || [];
    listeners.forEach(listener => listener(...args));
  }
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function* asyncCounter(max) {
  let count = 0;
  while (count < max) {
    yield count++;
    await delay(1000);
  }
}

(async function main() {
  const emitter = new EventEmitter();
  const countGen = asyncCounter(5);

  emitter.on('count', (num) => {
    print(`Current Count: ${num}`);
  });

  for await (let num of countGen) {
    emitter.emit('count', num);
  }
})();

 
const target = {
  message1: "hello",
  message2: "everyone"
};

const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : `Property '${prop}' not found!`;
  }
};

const proxy = new Proxy(target, handler);

print(proxy.message1);  
print(proxy.message3);  
