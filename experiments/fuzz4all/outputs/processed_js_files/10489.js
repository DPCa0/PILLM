 
(async () => {
  const fs = await import('fs/promises');

   
  const readJSON = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  };

   
  const saveJSON = async (filePath, obj) => {
    const data = JSON.stringify(obj, null, 2);
    await fs.writeFile(filePath, data);
  };

   
  const person = {
    name: 'Alice',
    age: 30
  };

  const logger = new Proxy(person, {
    get(target, property) {
      print(`Accessed ${property}: ${target[property]}`);
      return target[property];
    },
    set(target, property, value) {
      print(`Updated ${property} from ${target[property]} to ${value}`);
      target[property] = value;
      return true;
    }
  });

  logger.name;  
  logger.age = 31;  

   
  const fetchDataFromURLs = async (urls) => {
    const results = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      })
    );

    for await (const data of results) {
      print(data);
    }
  };

  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2'
  ];

  await fetchDataFromURLs(urls);

   
  const map = new Map();
  map.set('key1', 'value1');
  map.set('key2', 'value2');

  const set = new Set(['value1', 'value2', 'value3']);

  for (const [key, value] of map) {
    if (set.has(value)) {
      print(`Set contains map value: ${value} for key: ${key}`);
    }
  }

   
  const { name, ...rest }