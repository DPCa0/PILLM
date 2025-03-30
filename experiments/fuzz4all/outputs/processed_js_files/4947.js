 
async function* asyncCounter(max) {
  for (let i = 1; i <= max; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property '${prop}': ${target[prop]}`);
      return Reflect.get(...arguments);
    } else {
      print(`Property '${prop}' doesn't exist.`);
      return undefined;
    }
  },
  set: function(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(...arguments);
  }
};

const data = new Proxy({ count: 0 }, handler);

 
(async function main() {
  const countIterator = asyncCounter(5);

  for await (const num of countIterator) {
    data.count += num;
    print(`Total count: ${data.count}`);
  }

   
  print(`Accessing non-existent property: ${data.nonExistentProp}`);
})();
