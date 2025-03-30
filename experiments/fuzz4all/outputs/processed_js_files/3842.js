 

 
function simulateAsyncOperation(data, delay) {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

 
async function fetchData() {
  const data = await simulateAsyncOperation(['apple', 'banana', 'cherry'], 1000);
  return data;
}

 
function* dataGenerator(dataArray) {
  for (const item of dataArray) {
    yield item;
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'filteredData') {
      return target.data.filter(item => item.length <= 5);
    }
    return Reflect.get(target, prop, receiver);
  }
};

(async function() {
   
  const data = await fetchData();
  const generator = dataGenerator(data);

   
  const proxy = new Proxy({ data: [], filteredData: [] }, handler);

  print('Original Data:', data);

  for (const fruit of generator) {
    proxy.data.push(fruit);
  }

  print('Processed Data via Proxy:', proxy.filteredData);
})();
