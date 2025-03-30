 
const EventEmitter = require('events');

 
class ComplexProgram extends EventEmitter {
  constructor() {
    super();
    this.asyncData = this.fetchData();
  }

   
  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Data Fetched', timestamp: Date.now() });
      }, 1000);
    });
  }

   
  *numberGenerator() {
    let number = 1;
    while (true) {
      yield number++;
    }
  }

   
  initEvent() {
    this.emit('dataReceived', this.asyncData);
  }

   
  createProxy() {
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
          return function (...args) {
            print(`Method called: ${prop}`);
            return Reflect.get(target, prop, receiver).apply(target, args);
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }
}

 
const complexProgram = new ComplexProgram().createProxy();

 
complexProgram.on('dataReceived', async (dataPromise) => {
  const data = await dataPromise;
  print(`Event: Data Received - ${data.message} at ${new Date(data.timestamp)}`);
});

 
const gen = complexProgram.numberGenerator();
print(`Generated Number: ${gen.next().value}`);  
print(`Generated Number: ${gen.next().value}`);  

 
complexProgram.initEvent();
