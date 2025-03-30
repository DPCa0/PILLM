 

 
const ID = Symbol('id');

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ [ID]: 1, data: 'Hello, world!' });
    }, 1000);
  });
}

 
function* dataProcessor(data) {
  for (let item of data) {
    yield item.toUpperCase();
  }
}

 
const handler = {
  get: function(target, property) {
    if (property === ID) {
      return 'Access to ID is restricted';
    }
    return target[property];
  }
};

 
(async () => {
  try {
     
    const rawData = await fetchData();

     
    const proxiedData = new Proxy(rawData, handler);

     
    print('ID:', proxiedData[ID]);

     
    const processor = dataProcessor([proxiedData.data]);
    for (let value of processor) {
      print('Processed Value:', value);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
