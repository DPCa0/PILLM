const asyncOperation = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve('Data Loaded'), 1000));

const observable = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        print(`Getting value of ${prop}: ${target[prop]}`);
        return Reflect.get(target, prop);
      }
      return undefined;
    },
    set(target, prop, value) {
      print(`Setting value of ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    },
  });
};

(async function () {
  const obj = observable({ key: 'initial value' });
  print(obj.key);
  obj.key = 'new value';
  
  print('Starting async operation...');
  const result = await asyncOperation();
  print(result);

  const arr = [1, 2, 3, 4];
  const sum = arr.reduce((acc, num) => acc + num);
  print('Sum of array:', sum);

  const generator = (function* () {
    yield* [5, 6, 7, 8];
  })();

  for (const value of generator) {
    print('Generator value:', value);
  }

  const map = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
  ]);

  map.set('key3', 'value3');
  print('Map values:');
  for (const [key, value] of map) {
    print(`${key}: ${value}`);
  }
})();
