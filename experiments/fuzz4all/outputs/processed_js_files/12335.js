class DataEmitter {
  #data = [];
  
  constructor() {
    this.listeners = new Set();
  }
  
  on(event, listener) {
    if (event === 'data') {
      this.listeners.add(listener);
    }
  }
  
  emitData() {
    for (const listener of this.listeners) {
      listener(this.#generateData());
    }
  }
  
  #generateData() {
    const newData = Math.floor(Math.random() * 100);
    this.#data.push(newData);
    return newData;
  }
}

const asyncGenerator = async function* () {
  const emitter = new DataEmitter();
  
  emitter.on('data', data => {
    print('Data received:', data);
  });
  
  setInterval(() => {
    emitter.emitData();
  }, 1000);
  
  while (true) {
    yield await new Promise(resolve => setTimeout(() => resolve('Still running...'), 2000));
  }
};

(async () => {
  const gen = asyncGenerator();
  
  for await (const status of gen) {
    print(status);
  }
})();
