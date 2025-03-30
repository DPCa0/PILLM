class Emitter extends EventTarget {
  trigger(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { detail }));
  }
  on(eventName, callback) {
    this.addEventListener(eventName, callback);
  }
  off(eventName, callback) {
    this.removeEventListener(eventName, callback);
  }
}

const asyncOperation = async (data) => {
  return new Promise((resolve) => setTimeout(() => resolve(data * 2), 1000));
};

async function* dataGenerator() {
  for (let i = 0; i < 5; i++) {
    yield await asyncOperation(i);
  }
}

(async () => {
  const emitter = new Emitter();
  
  emitter.on('data', (e) => print(`Received data: ${e.detail}`));
  emitter.on('complete', () => print('All data processed.'));

  for await (const data of dataGenerator()) {
    emitter.trigger('data', data);
  }
  
  emitter.trigger('complete');
})();
