 
const EventEmitter = require('events');

 
class ComplexEmitter extends EventEmitter {
  constructor() {
    super();
    this.queue = [];
  }

   
  *processQueue() {
    while (this.queue.length) {
      const task = this.queue.shift();
      yield task();
    }
  }

  async emitEvent(event, data) {
    this.queue.push(() => this.emit(event, data));
    for (const task of this.processQueue()) {
      await task;
    }
  }

   
  async *[Symbol.asyncIterator]() {
    const queueCopy = [...this.queue];
    for (const task of queueCopy) {
      yield await new Promise((resolve) => {
        this.once(task, (data) => resolve(data));
      });
    }
  }
}

 
const eventHandler = {
  apply: async (target, thisArg, argumentsList) => {
    print(`Event: ${argumentsList[0]}, Data: ${JSON.stringify(argumentsList[1])}`);
    return Reflect.apply(...arguments);
  },
};

const complexEmitter = new ComplexEmitter();
complexEmitter.emitEvent = new Proxy(complexEmitter.emitEvent, eventHandler);

 
complexEmitter.on('data', (data) => {
  print(`Received: ${data}`);
});

 
(async () => {
  await complexEmitter.emitEvent('data', { id: 1, message: 'Hello, Advanced JavaScript!' });

  for await (const eventData of complexEmitter) {
    print(`Processed: ${eventData.message}`);
  }
})();
