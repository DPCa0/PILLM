(async () => {
  const getRandomNumber = () => new Promise(resolve => {
    setTimeout(() => resolve(Math.floor(Math.random() * 100)), 1000);
  });

  const asyncIterable = {
    [Symbol.asyncIterator]: function () {
      return {
        i: 0,
        next: async function () {
          if (this.i < 5) {
            this.i++;
            const randomNumber = await getRandomNumber();
            return { value: randomNumber, done: false };
          }
          return { done: true };
        }
      };
    }
  };

  for await (let num of asyncIterable) {
    print(`Generated number: ${num}`);
  }

  const createProxy = (target) => {
    return new Proxy(target, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        } else {
          console.warn(`Property "${prop}" doesn't exist.`);
          return undefined;
        }
      },
      set(obj, prop, value) {
        if (typeof value === 'number') {
          obj[prop] = value;
          return true;
        } else {
          console.error(`Invalid value for ${prop}. Must be a number.`);
          return false;
        }
      }
    });
  };

  const data = { a: 1, b: 2 };
  const proxiedData = createProxy(data);

  proxiedData.c = 3; // Valid
  proxiedData.d = 'text'; // Invalid

  print(proxiedData.a); // 1
  print(proxiedData.z); // Undefined with warning

  const deepClone = obj => {
    return structuredClone(obj);
  };

  const original = { foo: 'bar', nested: { value: 42 } };
  const clone = deepClone(original);

  print(original);
  print(clone);
})();
