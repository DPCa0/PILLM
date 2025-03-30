(async () => {
   
  const fibonacci = {
    [Symbol.iterator]() {
      let [prev, curr] = [0, 1];
      return {
        next() {
          [prev, curr] = [curr, prev + curr];
          return { value: prev, done: false };
        }
      };
    }
  };

   
  function* take(n, iterable) {
    for (const x of iterable) {
      if (n <= 0) return;
      n--;
      yield x;
    }
  }

   
  async function mockApiCall(data) {
    return new Promise(resolve => setTimeout(() => resolve(data * 2), 1000));
  }

   
  const numbers = [...take(5, fibonacci)];
  const doubledNumbers = await Promise.all(numbers.map(async (num) => {
    const result = await mockApiCall(num);
    return result;
  }));

   
  print(`Doubled Fibonacci numbers: ${doubledNumbers.join(', ')}`);

   
  const handler = {
    set(target, property, value) {
      print(`Property ${property} set to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const obj = new Proxy({}, handler);
  obj.firstName = 'John';
  obj.lastName = 'Doe';

   
  Reflect.set(obj, 'age', 30);
})();
