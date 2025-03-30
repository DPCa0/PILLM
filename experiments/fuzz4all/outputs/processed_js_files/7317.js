 
class AsyncEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(listener);
  }

  off(event, listenerToRemove) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(listener => listener !== listenerToRemove);
  }

  async emit(event, ...args) {
    if (!this.listeners[event]) return;
    const promises = this.listeners[event].map(listener => listener(...args));
    await Promise.all(promises);
  }
}

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  print('Listener 1 received:', data);
});

emitter.on('data', async (data) => {
  await new Promise(resolve => setTimeout(resolve, 50));
  print('Listener 2 received:', data);
});

(async () => {
  print('Emitting event...');
  await emitter.emit('data', { key: 'value' });
  print('All listeners have processed the event.');
})();

 
const handler = {
  get(target, prop) {
    print(`Getting ${prop}`);
    return prop in target ? target[prop] : `Property ${prop} does not exist.`;
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);

obj.a = 10;
print(obj.a);
print(obj.b);

 
function safeHTML(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const val = values[i - 1];
    const safeVal = String(val).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return acc + safeVal + str;
  });
}

const userInput = '<script>alert("xss")</script>';
const htmlOutput = safeHTML`<div>${userInput}</div>`;
print(htmlOutput);
