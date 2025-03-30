 
(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr < limit) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Accessing property "${prop}" with value: ${target[prop]}`);
        return target[prop];
      } else {
        throw new Error(`Property "${prop}" does not exist`);
      }
    },
    set: (target, prop, value) => {
      if (typeof value === 'number') {
        print(`Setting property "${prop}" to value: ${value}`);
        target[prop] = value;
      } else {
        throw new Error(`Property "${prop}" must be a number`);
      }
    }
  };

  const targetObject = { max: 100 };
  const proxy = new Proxy(targetObject, handler);

  const fibSequence = fibonacci(proxy.max);

  for (let num of fibSequence) {
    await delay(500);
    print(num);
  }

  proxy.max = 200;   

   
   
})();
