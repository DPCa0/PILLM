 
const fs = require('fs').promises;
const path = require('path');

 
(async () => {
  try {
    const directoryPath = path.join(__dirname, 'data');
    
     
    await fs.mkdir(directoryPath, { recursive: true });

     
    const filePath = path.join(directoryPath, 'complexData.json');
    const initialData = { message: 'Hello, World!', time: new Date() };
    
     
    await fs.writeFile(filePath, JSON.stringify(initialData, null, 2));

     
    const data = await fs.readFile(filePath, 'utf-8');
    const parsedData = JSON.parse(data);

     
    const { message, time } = parsedData;
    print(`Stored message: ${message} at ${new Date(time).toLocaleString()}`);

     
    const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
    const mySet = new Set(['key1', 'key3']);

     
    const combinedKeys = [...mySet, ...myMap.keys()];
    const uniqueKeys = [...new Set(combinedKeys)];

    print('Unique keys from Map and Set:', uniqueKeys);

     
    const handler = {
      get: (target, prop) => prop in target ? target[prop] : 'Property does not exist'
    };
    const proxy = new Proxy(parsedData, handler);

    print('Proxy message:', proxy.message);
    print('Proxy nonExistent:', proxy.nonExistent);
  } catch (error) {
    console.error('Error:', error);
  }
})();
