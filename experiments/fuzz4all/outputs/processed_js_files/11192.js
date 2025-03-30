 
async function* asyncGenerator() {
  const values = [1, 2, 3, 4, 5];
  for (const value of values) {
    yield new Promise(resolve => setTimeout(() => resolve(value), 100));
  }
}

function createReactiveObject(target, callback) {
  return new Proxy(target, {
    set(obj, prop, value) {
      obj[prop] = value;
      callback(prop, value);
      return true;
    }
  });
}

const reactiveObject = createReactiveObject({ count: 0 }, (prop, value) => {
  print(`Property ${prop} set to ${value}`);
});

(async function main() {
  reactiveObject.count = 0;
  for await (const value of asyncGenerator()) {
    reactiveObject.count += value;
    print(`Current Count: ${reactiveObject.count}`);
  }
})();
