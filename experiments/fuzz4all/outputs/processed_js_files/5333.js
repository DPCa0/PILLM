 

 
const data = [
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 34 },
  { id: 3, name: 'Charlie', age: 22 }
];

 
function* dataGenerator(dataArray) {
  for (const item of dataArray) {
    yield new Promise(resolve => setTimeout(() => resolve(item), 1000));
  }
}

 
async function processData(dataArray) {
  const gen = dataGenerator(dataArray);
  const results = [];

  for await (const itemPromise of gen) {
    const item = await itemPromise;
    print(`Processing ${item.name}`);
    results.push({ ...item, processed: true });
  }

  return results;
}

 
const handler = {
  get(target, prop) {
    if (prop === 'total') {
      return target.length;
    }
    return Reflect.get(target, prop);
  }
};

 
(async () => {
  const processedData = await processData(data);
  const proxiedData = new Proxy(processedData, handler);

  print('Processed Data:', proxiedData);
  print('Total items processed:', proxiedData.total);
})();
