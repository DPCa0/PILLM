 

(function() {
  const asyncOperation = (duration, value) => new Promise(resolve => setTimeout(() => resolve(value), duration));

  const handler = {
    get: (target, prop, receiver) => {
      if (prop in target) {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop, receiver);
      } else {
        console.warn(`Property ${prop} doesn't exist`);
        return undefined;
      }
    }
  };

  const target = { a: 10, b: 20 };
  const proxy = new Proxy(target, handler);

  async function main() {
    try {
      print('Starting async operations...');
      const result1 = await asyncOperation(1000, 'First Result');
      print(result1);

      const result2 = await asyncOperation(500, 'Second Result');
      print(result2);

      print('Accessing properties through Proxy:');
      print(proxy.a);
      print(proxy.b);
      print(proxy.c);

    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  main();
})();
