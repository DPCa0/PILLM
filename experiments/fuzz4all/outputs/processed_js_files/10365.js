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

const emitter = new EventEmitter();

const asyncProcess = async (data) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed: ${data}`);
    }, 1000);
  });
};

(async () => {
  const dataList = ['data1', 'data2', 'data3'];
  
  const results = await Promise.all(dataList.map(async (data) => {
    emitter.emit('processStart', data);
    const result = await asyncProcess(data);
    emitter.emit('processEnd', result);
    return result;
  }));
  
  print('All processes complete:', results);
})();

 
emitter.on('processStart', (data) => {
  print(`Starting process for: ${data}`);
});

emitter.on('processEnd', (result) => {
  print(`Finished processing: ${result}`);
});
