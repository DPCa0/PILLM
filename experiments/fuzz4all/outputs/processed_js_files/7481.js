 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexFunction() {
   
  const metadata = new WeakMap();

   
  function* fibonacci(n) {
    let [a, b] = [0, 1];
    while (n-- > 0) {
      [a, b] = [b, a + b];
      yield a;
    }
  }

   
  const fibonacciProxy = new Proxy([], {
    get: (target, prop) => {
      if (typeof prop === 'string' && !isNaN(prop)) {
        const index = Number(prop);
        while (target.length <= index) {
          target.push([...fibonacci(target.length + 1)].pop());
        }
        return target[index];
      }
      return target[prop];
    }
  });

   
  const dataObject = { name: 'Complex Object' };
  metadata.set(dataObject, { created: new Date(), id: Math.random() });

  print(`Metadata for dataObject: ${JSON.stringify(metadata.get(dataObject))}`);

   
  for (let i = 0; i < 10; i++) {
    print(`Fibonacci ${i}: ${await fibonacciProxy[i]}`);
    await delay(300);  
  }
}

 
complexFunction().catch(console.error);
