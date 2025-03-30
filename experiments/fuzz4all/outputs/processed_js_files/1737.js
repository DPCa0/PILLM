 
const data = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    for (const item of data) {
       
      await new Promise(resolve => setTimeout(resolve, 100));
      yield item;
    }
  }
};

const handler = {
  get: function(target, property, receiver) {
    const result = Reflect.get(target, property, receiver);
    if (typeof result === 'function') {
      return function(...args) {
        print(`Method called: ${property}`);
        return result.apply(this, args);
      }
    }
    return `Intercepted access to property: ${property}`;
  }
};

async function process() {
  const proxy = new Proxy(asyncIterable, handler);
  for await (const item of proxy) {
    print(`Processing: ${item.name}`);
  }
}

process().catch(console.error);
