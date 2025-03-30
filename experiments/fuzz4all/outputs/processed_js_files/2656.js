const { performance } = require('perf_hooks');

 

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      print(`Property ${prop} does not exist.`);
    }
  }
};

const targetObj = { a: 1, b: 2, c: 3 };
const proxyObj = new Proxy(targetObj, handler);

 
async function* asyncGenerator() {
  for (let i = 0; i < 3; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield i;
  }
}

 
class Timer {
  constructor() {
    this.startTime = performance.now();
  }
  
  get duration() {
    return (performance.now() - this.startTime).toFixed(2) + 'ms';
  }
  
  reset() {
    this.startTime = performance.now();
  }
}

 
const timer = new Timer();

(async () => {
  print('Starting async operations...');
  for await (const num of asyncGenerator()) {
    print(`Received: ${num}`);
  }
  print('Async operations finished.');

   
  print(proxyObj.a);  
  print(proxyObj.z);  
  
   
  print(`Duration: ${timer.duration}`);
  timer.reset();
  print('Timer reset.');
  print(`Duration after reset: ${timer.duration}`);
})();
