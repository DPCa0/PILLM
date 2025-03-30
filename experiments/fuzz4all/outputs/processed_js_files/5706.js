 

const handler = {
  get(target, prop, receiver) {
    if (prop === Symbol.toPrimitive) {
      return () => JSON.stringify(target);
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    print(`Setting property ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const createTrackedObject = obj => new Proxy(obj, handler);

const asyncTracker = async () => {
  const data = createTrackedObject({
    count: 0,
    description: 'A tracked object with a proxy.'
  });

  data.count += 1;   

  console.log(`Async Operation: ${await new Promise(resolve => {
    setTimeout(() => resolve("Async Task Completed"), 1000);
  })}`);

  data.count = 2;   

  const showSymbol = Symbol('show');
  data[showSymbol] = () => print(`Current Data: ${data}`);

  data[showSymbol]();  
};

asyncTracker();
