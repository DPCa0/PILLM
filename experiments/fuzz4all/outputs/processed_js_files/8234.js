 
const { EventEmitter } = require('events');

 
async function* asyncRange(start, end) {
  for (let i = start; i < end; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

 
const target = {
  message1: "Hello",
  message2: "World"
};

const handler = {
  get: function(obj, prop) {
    if (prop in obj) {
      return `Proxy: ${obj[prop]}`;
    }
    return 'Property does not exist';
  }
};

const proxy = new Proxy(target, handler);

 
class Utility {
  #secret = 'hidden';
  
  static printMessages() {
    print(proxy.message1);
    print(proxy.message2);
  }
  
  revealSecret() {
    print(`The secret is ${this.#secret}`);
  }
}

 
const emitter = new EventEmitter();

emitter.on('event', (message) => {
  print(`Received event with message: ${message}`);
});

(async function main() {
   
  Utility.printMessages();
  
   
  for await (const num of asyncRange(1, 4)) {
    print(`Async number: ${num}`);
  }
  
   
  const utilityInstance = new Utility();
  utilityInstance.revealSecret();
  
   
  emitter.emit('event', 'Hello from EventEmitter!');
})();
