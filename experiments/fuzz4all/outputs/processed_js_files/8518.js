 

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

 
const reactiveHandler = {
  set(target, property, value) {
    target[property] = value;
    if (typeof target.onChange === 'function') {
      target.onChange(property, value);
    }
    return true;
  }
};

 
const settings = new Proxy({
  theme: 'dark',
  notifications: {
    email: true,
    sms: false
  },
  onChange: (prop, value) => {
    print(`Setting changed - ${prop}: ${value}`);
  }
}, reactiveHandler);

 
async function* simulateDataStream() {
  for (let i = 1; i <= 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield `Data packet ${i}`;
  }
}

 
(async function processDataStream() {
  const dataStream = simulateDataStream();
  for await (const data of dataStream) {
    print(data);
  }
})();

 
const eventBus = new EventEmitter();

eventBus.on('dataReceived', data => {
  print(`Event received with data: ${data}`);
});

 
(async function emitEvents() {
  const dataToEmit = ['Event 1', 'Event 2', 'Event 3'];
  for (const data of dataToEmit) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    eventBus.emit('dataReceived', data);
  }
})();

 
function configure({ theme = 'light', notifications = { email: false, sms: true } }) {
  print(`Configuring with theme: ${theme}, email notifications: ${notifications.email}, sms notifications: ${notifications.sms}`);
}

configure(settings);

 
settings.theme