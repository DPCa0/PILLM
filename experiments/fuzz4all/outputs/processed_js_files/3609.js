 
const createObservable = (obj) => {
  const listeners = new Set();

  return new Proxy(obj, {
    set(target, property, value) {
      target[property] = value;
      listeners.forEach(listener => listener(property, value));
      return true;
    },
    get(target, property) {
      if (property === 'watch') {
        return (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        };
      }
      return target[property];
    }
  });
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const data = createObservable({ key: 'value' });

  const unwatch = data.watch((prop, val) => {
    print(`Property ${prop} changed to ${val}`);
  });

  print('Initial value:', data.key);

  await delay(1000);
  data.key = 'new value';

  await delay(1000);
  unwatch();

  await delay(1000);
  data.key = 'another value';  
})();
