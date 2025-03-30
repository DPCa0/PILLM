 
async function* asyncGenerator() {
  yield new Promise((resolve) => setTimeout(() => resolve(1), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve(2), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve(3), 1000));
}

const handler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Accessing property '${prop}'`);
      return target[prop];
    } else {
      return 'Property not found';
    }
  },
  set: function(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);
obj.a = 'Hello';
print(obj.a);
print(obj.b);

(async function() {
  for await (let num of asyncGenerator()) {
    print(num);
  }
})();
