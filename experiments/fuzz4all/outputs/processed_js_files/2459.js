 
(async () => {
  const { promises: fs } = await import('fs');

   
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Getting property '${prop}': ${target[prop]}`);
        return target[prop];
      }
      throw new Error(`Property '${prop}' does not exist.`);
    },
    set: (target, prop, value) => {
      print(`Setting property '${prop}' to ${value}`);
      target[prop] = value;
      return true;
    }
  };

  const complexObject = new Proxy({ a: 1, b: 2 }, handler);

   
  print(complexObject.a);
  complexObject.c = 3;

   
  try {
    const data = await fs.readFile('./data.txt', 'utf-8');
    print('File content:', data);

     
    const logTag = (strings, ...values) => {
      return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
    };

    print(logTag`Data read from file: ${data}`);

     
    const nestedObject = { user: { name: 'Alice', age: null } };
    const userAge = nestedObject.user?.age ?? 'Age not provided';
    print(`User Age: ${userAge}`);

  } catch (err) {
    console.error('Error reading file:', err);
  }

   
  const uniqueNumbers = new Set([1, 2, 3, 2, 1]);
  print('Unique Numbers:', [...uniqueNumbers]);

   
  const userMap = new Map([
    ['name', 'John'],
    ['age', 30]
  ]);

  userMap.forEach((value, key) => {
    print(`${key}: ${value}`);
  });
})();
