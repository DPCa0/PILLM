 
(async () => {
  const { promises: fs } = await import('fs');

   
  const targetObject = { message: "Hello, world!" };
  const handler = {
    get: function(obj, prop) {
      print(`Property '${prop}' has been accessed.`);
      return Reflect.get(...arguments);
    }
  };
  const proxy = new Proxy(targetObject, handler);

   
  const demoMap = new Map();
  const demoSet = new Set(['a', 'b', 'c']);
  
  function* demoGenerator(set) {
    for (let value of set) {
      yield value;
    }
  }

  const iterator = demoGenerator(demoSet);
  for (let value of iterator) {
    demoMap.set(value, value.toUpperCase());
  }

   
  const filePath = './output.txt';
  await fs.writeFile(filePath, proxy.message);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    print("Read from file:", data);
  } catch (error) {
    console.error('Error reading file:', error);
  }

   
  demoMap.forEach((val, key) => print(`Map entry: ${key} => ${val}`));
})();
