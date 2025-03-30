 
(async () => {
  const { readFile } = await import('fs/promises');
  
   
  async function fetchAndProcessData(urls) {
    try {
      const fetchPromises = urls.map(async (url) => {
        const response = await fetch(url);
        return response.json();
      });
      
      const data = await Promise.all(fetchPromises);
      print('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   
  const targetObject = { name: "Alice", age: 30 };
  const handler = {
    get: function(target, property) {
      if (property in target) {
        print(`Getting ${property}: ${target[property]}`);
        return target[property];
      } else {
        print(`Property ${property} does not exist`);
        return undefined;
      }
    }
  };
  
  const proxy = new Proxy(targetObject, handler);

   
  const uniqueKey = Symbol('unique');
  targetObject[uniqueKey] = 'uniqueValue';

   
  function* idGenerator() {
    let id = 1;
    while (true) {
      yield id++;
    }
  }
  
  const idGen = idGenerator();
  print('Generated IDs:', idGen.next().value, idGen.next().value);

   
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2'
  ];
  fetchAndProcessData(urls);

   
  print(proxy.name);  
  print(proxy.unknownProp);  

   
  try {
    const data = await readFile('./example.txt', 'utf8');
    print('File content:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
})();
