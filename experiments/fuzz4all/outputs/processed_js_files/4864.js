 
(async () => {
  const fs = await import('fs/promises');
  
   
  const fileHandler = {
    async get(target, property) {
      print(`Accessing property '${property}'`);
      return target[property];
    },
  };

  const fsProxy = new Proxy(fs, fileHandler);

   
  try {
    const data = await fsProxy.readFile('data.json', 'utf-8');
    const jsonData = JSON.parse(data);

     
    function* iterateObject(obj) {
      for (const key of Object.keys(obj)) {
        yield [key, obj[key]];
      }
    }

     
    for (const [key, value] of iterateObject(jsonData)) {
      value?.info ||= 'No additional info';
      print(`${key}: ${value.info}`);
    }

     
    const uniqueKeys = new Set(Object.keys(jsonData));
    const keyMap = new Map([...uniqueKeys].map(key => [key, jsonData[key]]));

    print('Map of JSON data:', keyMap);
  } catch (error) {
    console.error('Error reading or processing file:', error);
  }
})();
