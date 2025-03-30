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

async function asyncTask(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Processed ${data}`), 1000);
  });
}

const eventEmitter = new EventEmitter();

eventEmitter.on('process', async (data) => {
  const result = await asyncTask(data);
  print(result);
});

const processData = async function* (dataArray) {
  for (let data of dataArray) {
    yield await asyncTask(data);
  }
};

(async () => {
  const dataArray = ['data1', 'data2', 'data3'];
  for await (let result of processData(dataArray)) {
    eventEmitter.emit('process', result);
  }
})();
