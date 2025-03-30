 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* delayedNumbers(max, delayTime) {
  for (let i = 0; i <= max; i++) {
    await delay(delayTime);
    yield i;
  }
}

 
const createIncrementer = (increment) => {
  return (value) => value + increment;
};

 
const handler = {
  get: (target, prop) => {
    if (prop === 'logAndReturn') {
      return function(...args) {
        print(`Called method ${prop} with arguments:`, args);
        return target[prop](...args);
      };
    }
    return target[prop];
  }
};

 
class NumberProcessor {
  logAndReturn(num) {
    print(`Processing number: ${num}`);
    return num * 2;
  }
}

 
const processorProxy = new Proxy(new NumberProcessor(), handler);

 
(async () => {
  const incrementByTwo = createIncrementer(2);

  for await (const num of delayedNumbers(5, 1000)) {
    const incremented = incrementByTwo(num);
    const processed = processorProxy.logAndReturn(incremented);
    print(`Final Result: ${processed}`);
  }
})();
