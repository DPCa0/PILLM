 

 
function* dataGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve('Data 1'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Data 2'), 2000));
  yield new Promise(resolve => setTimeout(() => resolve('Data 3'), 3000));
}

 
const handler = {
  get: function(target, property, receiver) {
    if (property in target) {
      print(`Getting ${property}`);
      return Reflect.get(target, property, receiver);
    } else {
      print(`Property ${property} not found.`);
      return 'Not available';
    }
  }
};

 
async function fetchData() {
  const generator = dataGenerator();

  for await (const data of generator) {
    print(`Fetched: ${data}`);
  }
}

 
const dataObject = new Proxy({ key1: 'value1', key2: 'value2' }, handler);

 
fetchData().then(() => {
  print(`Object key1: ${dataObject.key1}`);
  print(`Object key3: ${dataObject.key3}`);  
});
