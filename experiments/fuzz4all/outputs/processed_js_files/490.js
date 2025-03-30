 
async function complexOperation() {
  return new Promise((resolve) => setTimeout(() => resolve('Operation Complete'), 2000));
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Getting property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

let targetObject = { status: 'Pending' };
const proxy = new Proxy(targetObject, handler);

 
function* statusUpdater() {
  yield 'Started';
  yield* (async function* () {
    proxy.status = await complexOperation();
    yield proxy.status;
  })();
  yield 'Done';
}

 
(async function consumeGenerator() {
  const generator = statusUpdater();
  for await (const status of generator) {
    print(`Current Status: ${status}`);
  }
})();
