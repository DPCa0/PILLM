 

 
async function* asyncNumberSequence(limit, delay) {
  for (let i = 0; i <= limit; i++) {
    await new Promise(res => setTimeout(res, delay));
    yield i;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Property "${prop}" has been accessed.`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    print(`Property "${prop}" has been set to ${value}.`);
    return Reflect.set(...arguments);
  }
};

 
async function createProxy() {
  const sequenceProxy = new Proxy({ value: null }, handler);
  for await (const num of asyncNumberSequence(5, 500)) {
    sequenceProxy.value = num;
    print(`Current sequence value: ${sequenceProxy.value}`);
  }
}

 
createProxy();
