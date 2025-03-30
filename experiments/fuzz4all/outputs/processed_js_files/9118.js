 
async function* asyncNumberGenerator() {
  for (let i = 1; i <= 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield i;
  }
}

 
function memoize(fn) {
  const cache = new WeakMap();
  return function (key) {
    if (!cache.has(key)) {
      cache.set(key, fn.call(this, key));
    }
    return cache.get(key);
  };
}

 
const complexCalculation = memoize((num) => {
  print('Calculating for', num);
  return num * num;  
});

 
const handler = {
  get: function (obj, prop) {
    if (prop in obj) {
      return obj[prop];
    } else {
      return `Property "${prop}" does not exist`;
    }
  },
};

const target = { x: 10, y: 20 };
const proxy = new Proxy(target, handler);

(async () => {
  print('Starting number generation:');
  for await (const num of asyncNumberGenerator()) {
    print('Generated number:', num);
    print('Complex calculation result:', complexCalculation(num));
  }

  print(proxy.x);  
  print(proxy.z);  
})();
