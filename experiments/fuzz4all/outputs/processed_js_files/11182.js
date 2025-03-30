 
(async function complexFeatureDemo() {
  try {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const asyncIterable = {
      *[Symbol.asyncIterator]() {
        yield await sleep(500).then(() => 'Step 1 complete');
        yield await sleep(500).then(() => 'Step 2 complete');
        yield await sleep(500).then(() => 'Step 3 complete');
      }
    };

     
    const handler = {
      get: (obj, prop) => (prop in obj ? obj[prop] : 'Property not found')
    };

    const target = {
      greeting: 'Hello, world!',
      farewell: 'Goodbye, world!'
    };

    const proxy = new Proxy(target, handler);

     
    const { createInterface } = await import('readline');
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    print(proxy.greeting);

     
    for await (const step of asyncIterable) {
      print(step);
    }

    rl.question('What do you think of JavaScript? ', answer => {
      print(`You think: ${answer}`);
      rl.close();
    });
  } catch (error) {
    console.error('Error encountered:', error);
  }
})();
