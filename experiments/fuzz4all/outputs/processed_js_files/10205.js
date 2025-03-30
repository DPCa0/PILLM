 
(async () => {
  const { promises: fs } = await import('fs');

   
  const handler = {
    get(target, prop) {
      if (prop in target) {
        return Reflect.get(target, prop);
      } else {
        print(`Property "${prop}" not found, defaulting to 42`);
        return 42;
      }
    }
  };

  const data = new Proxy({ a: 1, b: 2 }, handler);

   
  async function readFileAsync(path) {
    try {
      const content = await fs.readFile(path, 'utf-8');
      print('File content:', content);
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

   
  function logAllProperties(...props) {
    print(`All Properties: ${props.join(', ')}`);
  }

   
  function* idGenerator() {
    let id = 0;
    while (true) {
      yield id++;
    }
  }

  const ids = idGenerator();

   
  const keyValueMap = new Map();
  keyValueMap.set('foo', 'bar');
  keyValueMap.set('baz', 'qux');

   
  async function* asyncGenerator() {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
  }

  for await (let num of asyncGenerator()) {
    print(`Async generated number: ${num}`);
  }

   
  logAllProperties(...Object.keys(data), ...keyValueMap.keys());
  print('Dynamic property "c":', data.c);
  print('New ID:', ids.next().value);

   
  await readFileAsync('example.txt');
})();
