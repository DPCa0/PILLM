 
async function* asyncNumberGenerator() {
  for (let i = 0; i < 5; i++) {
     
    await new Promise(resolve => setTimeout(resolve, 100 * i));
    yield i;
  }
}

 
const targetObject = { message: "Hello, world!" };
const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' was accessed`);
    return Reflect.get(...arguments);
  }
};

const proxy = new Proxy(targetObject, handler);

 
const privateData = new WeakMap();

class DataContainer {
  constructor(value) {
    privateData.set(this, { value });
  }
  
  getValue() {
    return privateData.get(this).value;
  }
}

 
function tag(strings, ...expressions) {
  return strings.reduce((acc, str, idx) => `${acc}${str}${expressions[idx] || ''}`, '');
}

(async () => {
  print(tag`Generated Number: ${await asyncNumberGenerator().next().then(res => res.value)}`);
  
  const container = new DataContainer(42);
  print(`Private Value: ${container.getValue()}`);

  print(proxy.message);
})();
