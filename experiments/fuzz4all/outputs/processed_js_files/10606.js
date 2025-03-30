 

 
function* dataFetcher() {
  yield new Promise((resolve) => setTimeout(() => resolve('Data chunk 1'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data chunk 2'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data chunk 3'), 1000));
}

 
async function processData(generator) {
  for (const chunk of generator) {
    print(await chunk);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(...arguments);
  }
};

 
const uniqueID = Symbol('id');

 
const dataObject = new Proxy({
  [uniqueID]: 12345,
  name: 'SampleData'
}, handler);

 
print(`Unique ID: ${dataObject[uniqueID]}`);
print(`Name: ${dataObject.name}`);

 
processData(dataFetcher());
