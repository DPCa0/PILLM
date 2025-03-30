 
(async () => {
  const fs = await import('fs/promises');

   
  const handler = {
    get(target, prop) {
      if (prop in target) {
        print(`Property '${prop}' accessed.`);
        return target[prop];
      } else {
        throw new Error(`Property '${prop}' does not exist.`);
      }
    },
    set(target, prop, value) {
      print(`Setting property '${prop}' to '${value}'.`);
      target[prop] = value;
      return true;
    },
  };

  const obj = new Proxy({}, handler);

   
  obj.message = 'Hello, world!';
  print(obj.message);

   
  const fileOperations = async () => {
    try {
      await Promise.all([
        fs.writeFile('message.txt', obj.message),
        fs.readFile('message.txt', 'utf8').then((data) => {
          print('File contents:', data);
        }),
      ]);
    } catch (error) {
      console.error('Error with file operations:', error);
    }
  };

  await fileOperations();

   
  function* generateSequence() {
    yield* [1, 2, 3, 4, 5];
  }

   
  for (let value of generateSequence()) {
    print(value);
  }

   
  const weakMap = new WeakMap();
  const key = {};
  weakMap.set(key, 'Some value');
  print('WeakMap value:', weakMap.get(key));

   
  key = null;
})();
