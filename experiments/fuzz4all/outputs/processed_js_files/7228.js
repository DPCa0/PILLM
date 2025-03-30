 

 
function* delayedGenerator(values) {
  for (let value of values) {
    yield new Promise(resolve => setTimeout(() => resolve(value), 1000));
  }
}

 
async function processGenerator(gen) {
  for await (const value of gen) {
    print(value);
  }
}

 
const mapHandler = {
  get(target, prop) {
    if (prop === 'set') {
      return function(key, value) {
        print(`Setting ${key} to ${value}`);
        return Map.prototype.set.call(target, key, value);
      };
    }
    return target[prop];
  }
};

 
const proxiedMap = new Proxy(new Map(), mapHandler);
proxiedMap.set('foo', 'bar');
proxiedMap.set('baz', 42);

 
const values = ['Hello', 'world', '!'];
const gen = delayedGenerator(values);
processGenerator(gen);
