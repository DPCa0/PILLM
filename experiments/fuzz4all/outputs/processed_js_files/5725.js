 
(async () => {
  const { readFile } = await import('fs/promises');

   
  async function readJsonFile(filePath) {
    try {
      const data = await readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading file from disk: ${error}`);
    }
  }

   
  const handler = {
    get: (target, prop, receiver) => {
      if (prop in target) {
        print(`Accessing property '${prop}' with value '${target[prop]}'`);
        return target[prop];
      } else {
        console.warn(`Property '${prop}' does not exist`);
        return undefined;
      }
    },
  };

   
  const user = {
    name: 'Alice',
    age: 30,
    city: 'Wonderland',
  };

  const userProxy = new Proxy(user, handler);

   
  const { name, ...rest } = userProxy;
  print(`Name: ${name}`);
  print(`Rest of the properties:`, rest);

   
  const numbers = [1, 2, 3, 4, 3, 2, 1];
  const uniqueNumbers = new Set(numbers);
  print(`Unique numbers:`, [...uniqueNumbers]);

   
  const map = new Map();
  map.set('name', 'Alice');
  map.set('age', 30);

  map.forEach((value, key) => {
    print(`Key: ${key}, Value: ${value}`);
  });

   
  const sym1 = Symbol('unique');
  const sym2 = Symbol('unique');
  print(`Are symbols equal? ${sym1 === sym2}`);

   
  function tag(strings, ...values) {
    return strings.reduce((result, str, i) => `${result}${str}<${values[i] || ''}>`, '');
  }

  const name2 = 'Bob';
  print(tag`Hello, ${name2}!`);

   
  const filePath = './example.json';