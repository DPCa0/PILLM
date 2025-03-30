 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* asyncGenerator(max) {
  for (let i = 0; i < max; i++) {
    await delay(100);
    yield i;
  }
}

const handler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Calling ${prop} with arguments: ${args}`);
        return Reflect.apply(target[prop], receiver, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
};

const asyncIterable = new Proxy(asyncGenerator(5), handler);

(async () => {
  for await (const num of asyncIterable) {
    print(`Received: ${num}`);
  }
})();
