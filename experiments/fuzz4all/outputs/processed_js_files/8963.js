 
class Counter {
  #count = 0;  

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
const handler = {
  get(target, property, receiver) {
    if (typeof target[property] === 'function') {
      return function (...args) {
        print(`Called ${property} with arguments: ${JSON.stringify(args)}`);
        return target[property].apply(this, args);
      };
    }
    return Reflect.get(target, property, receiver);
  }
};

 
(async () => {
  const counter = new Counter();
  const proxyCounter = new Proxy(counter, handler);

  proxyCounter.increment();
  print(`Count after increment: ${proxyCounter.getCount()}`);

   
  if (proxyCounter.getCount() === 1) {
    const { dynamicFeature } = await import('./dynamicFeature.js');  
    dynamicFeature();
  }

  await delay(1000);
  print('Completed after 1 second');
})();
