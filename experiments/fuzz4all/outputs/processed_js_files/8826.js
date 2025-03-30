 
(async () => {
   
  const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');

   
  const longRunningOperation = async () => {
    return new Promise((resolve) => setTimeout(() => resolve('Operation complete'), 2000));
  };

   
  const processData = async (data) => {
    print('Processing data...');
    const result = await longRunningOperation();
    return _.chunk(data, 2);  
  };

   
  const uniqueData = new Set([1, 2, 3, 4, 4, 5]);
  const dataArray = [...uniqueData];  

  print('Original data:', dataArray);

   
  const [firstChunk, secondChunk] = await processData(dataArray);
  print('First Chunk:', firstChunk);
  print('Second Chunk:', secondChunk);

   
  const dataHandler = {
    set: (obj, prop, value) => {
      print(`Setting ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    },
  };

  const dataProxy = new Proxy({}, dataHandler);
  dataProxy.newProperty = 'Hello Proxy';

  print(dataProxy.newProperty);
})();
