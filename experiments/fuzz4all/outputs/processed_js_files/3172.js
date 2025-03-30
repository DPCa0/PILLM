 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchDataAndProcess() {
   
  print('Fetching data...');
  await delay(1000);
  const data = [1, 2, 3, 4, 5];

   
  for (let item of data) {
    print(`Processing item ${item}`);
    await delay(500);
    yield item * 2;
  }
}

 
(async () => {
  for await (let processedItem of fetchDataAndProcess()) {
    print(`Processed Item: ${processedItem}`);
  }
  print('All data processed');
})();

 
const targetObject = {
  message: 'Hello, Proxy!'
};

const handler = {
  set(target, key, value) {
    print(`Property ${key} set to ${value}`);
    target[key] = value;
    return true;
  }
};

const proxyObject = new Proxy(targetObject, handler);
proxyObject.message = 'Hello, World!';
proxyObject.newProperty = 'This is a new property';
