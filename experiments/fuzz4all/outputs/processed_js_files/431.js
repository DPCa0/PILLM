 

 
const dataSymbol = Symbol('data');

 
const handler = {
  get(target, property, receiver) {
    if (property === 'watch') return target.watch;
    return Reflect.get(target[dataSymbol], property, receiver);
  },
  set(target, property, value) {
    target[dataSymbol][property] = value;
    if (target.watch.has(property)) {
      target.watch.get(property).forEach(callback => callback(value));
    }
    return true;
  }
};

 
class ReactiveData {
  constructor(initialData = {}) {
    this[dataSymbol] = initialData;
    this.watch = new Map();
    return new Proxy(this, handler);
  }

  onChange(property, callback) {
    if (!this.watch.has(property)) {
      this.watch.set(property, []);
    }
    this.watch.get(property).push(callback);
  }
}

 
async function processData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data * 2);
    }, 1000);
  });
}

 
const reactiveData = new ReactiveData({ count: 0 });

 
reactiveData.onChange('count', async (newValue) => {
  const processedValue = await processData(newValue);
  print(`Processed count: ${processedValue}`);
});

 
reactiveData.count = 5;
reactiveData.count = 10;
