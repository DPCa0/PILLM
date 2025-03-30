 

 
const DataModule = (() => {
  const data = new Map();

   
  const _fetchData = Symbol('fetchData');

  class DataHandler {
    constructor(initialData) {
      initialData.forEach(([key, value]) => data.set(key, value));
    }

    async [_fetchData](key) {
       
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = data.get(key);
          if (result) {
            resolve(result);
          } else {
            resolve('Data not found');
          }
        }, 1000);
      });
    }

    async getData(key) {
      try {
        const result = await this[_fetchData](key);
        return result;
      } catch (error) {
        return 'Error fetching data';
      }
    }
  }

  return {
    DataHandler
  };
})();

 
const inputData = [
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3']
];

 
const { DataHandler } = DataModule;

 
(async () => {
  const handler = new DataHandler(inputData);
  
  const key = 'key2';
  const result = await handler.getData(key);
  print(`Data for ${key}: ${result}`);
})();
