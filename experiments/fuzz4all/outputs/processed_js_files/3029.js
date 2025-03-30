 
(async () => {
  const fs = await import('fs/promises');

   
  const readAndLogFile = async (filePath) => {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      print(`File Content: \n${data}`);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

   
  const handler = {
    get: (obj, prop) => {
      if (prop in obj) {
        print(`Getting ${prop}: ${obj[prop]}`);
        return obj[prop];
      }
      console.warn(`Property ${prop} does not exist, defaulting to null.`);
      return null;
    },
    set: (obj, prop, value) => {
      if (typeof value === 'string') {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
      } else {
        throw new Error('Only strings are allowed as property values');
      }
    }
  };

   
  const data = new Proxy({}, handler);
  data.name = 'JavaScript Proxy';
  print(data.name);

   
  function* fibonacci(n) {
    let [prev, current] = [0, 1];
    for (let i = 0; i < n; i++) {
      [prev, current] = [current, prev + current];
      yield prev;
    }
  }

   
  const fib = fibonacci(5);
  print([...fib]);

   
  const uniqueId = Symbol('id');
  const objWithSymbol = {
    [uniqueId]: 12345
  };

  print(`Object with symbol id: ${objWithSymbol[uniqueId]}`);

   
  const emphasize = (strings, ...values) => {
    return strings.reduce((result, str, i) => `${result}${str.toUpperCase()}${values[i] ? `**${values[i].toUpperCase()}**` : ''}`, '');
  };

  const name = 'world';
  print(emphasize`Hello, ${name}!`);
})();
