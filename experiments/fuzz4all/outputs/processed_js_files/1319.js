 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* randomDelayGenerator(max, times) {
  for (let i = 0; i < times; i++) {
    const randomDelay = Math.floor(Math.random() * max);
    await delay(randomDelay);
    yield `Yielded after ${randomDelay} ms`;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      print(`Attempted to access nonexistent property: "${prop}"`);
      return undefined;
    }
  }
};

const targetObject = { existingProperty: 'I exist!' };
const proxy = new Proxy(targetObject, handler);

 
(async () => {
  const generator = randomDelayGenerator(1000, 5);
  for await (let message of generator) {
    print(message);
  }

   
  print(proxy.existingProperty);
  print(proxy.nonexistentProperty);
})();
