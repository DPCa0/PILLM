(async function() {
   
  const fetchData = url => new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: 'Advanced JS', version: 'ES2023' };
      resolve(data);
    }, 1000);
  });

  try {
    const data = await fetchData('https://api.example.com/data');
    
     
    const { name, version } = data;
    
     
    print(`Fetched Data: ${name}, Version: ${version}`);

     
    const process = data => ({ ...data, processed: true });

     
    const processedData = process({ ...data, timestamp: new Date().toISOString() });
    print(`Processed Data:`, processedData);
    
     
    const handler = {
      get: function(target, prop, receiver) {
        if (prop in target) {
          return target[prop];
        } else {
          throw new Error(`Property ${prop} doesn't exist`);
        }
      }
    };
    
    const proxyData = new Proxy(processedData, handler);
    print(`Accessing name via Proxy: ${proxyData.name}`);
    // print(proxyData.nonExistent); // Uncomment to see the error
    
    // Using Map as a data structure
    const dataMap = new Map();
    dataMap.set('original', data);
    dataMap.set('processed', processedData);
    
    // Iterating with for...of
    for (const [key, value] of dataMap) {
      print(`Map entry: ${key} =`, value);
    }

    // Using Symbols
    const sym = Symbol('uniqueId');
    proxyData[sym] = 'hiddenValue';
    print(`Symbol value: ${proxyData[sym]}`);

    // Using Classes with static properties
    class Utility {
      static identifier = sym;
      static getIdentifier(data) {
        return data[this.identifier];
      }
    }

    print(`Symbol accessed via Utility class: ${Utility.getIdentifier(proxyData)}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
