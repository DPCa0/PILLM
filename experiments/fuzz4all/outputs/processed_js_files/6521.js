 
(async () => {
  const fs = await import('fs/promises');

   
  const readJSONFile = async (filePath) => {
    try {
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  };

   
  const logger = (obj) => {
    return new Proxy(obj, {
      get(target, property) {
        print(`Property '${property}' was accessed`);
        return target[property];
      },
      set(target, property, value) {
        print(`Property '${property}' was set to '${value}'`);
        target[property] = value;
        return true;
      },
    });
  };

   
  const sampleJSONData = () => ({
    message: "Hello, world!",
    timestamp: new Date().toISOString(),
  });

   
  const sampleDataPath = './sample.json';
  await fs.writeFile(sampleDataPath, JSON.stringify(sampleJSONData(), null, 2));

   
  const data = await readJSONFile(sampleDataPath);
  const proxiedData = logger(data);

  print(proxiedData.message);  
  proxiedData.newProperty = 'This is a new property';  

})();
