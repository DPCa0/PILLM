 

 
function* dataStream() {
  yield* ['Data1', 'Data2', 'Data3', 'Data4'];
}

 
async function fetchData(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Processed ${data}`), 1000);
  });
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property: ${prop}`);
    return prop in target ? target[prop] : `Property ${prop} not found!`;
  }
};

 
const observedObject = new Proxy({ key1: 'value1', key2: 'value2' }, handler);

 
async function processDataStream() {
  const generator = dataStream();
  for (let data of generator) {
    const result = await fetchData(data);
    print(result);
  }
}

 
processDataStream();

 
print(observedObject.key1);
print(observedObject.key3);
