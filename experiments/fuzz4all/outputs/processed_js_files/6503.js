 

 
async function* generatePromises() {
  let index = 0;
  while (index < 3) {
    yield new Promise((resolve) => setTimeout(() => resolve(index++), 1000));
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'next') {
      return async function() {
        const result = await Reflect.get(target, prop, receiver).apply(this, arguments);
        if (!result.done) {
          print(`Yielded: ${result.value}`);
        }
        return result;
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
(async () => {
  const proxyGenerator = new Proxy(generatePromises(), handler);
  for await (let num of proxyGenerator) {
    print(`Processed: ${num}`);
  }
  print('Completed!');
})();
