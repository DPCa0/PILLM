 

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};

const targetObject = { name: 'Alice', age: 30 };
const proxy = new Proxy(targetObject, handler);

 
async function* fetchData() {
  const simulateNetworkRequest = (data) =>
    new Promise((resolve) => setTimeout(() => resolve(data), 1000));

  yield await simulateNetworkRequest('Data Part 1');
  yield await simulateNetworkRequest('Data Part 2');
  yield await simulateNetworkRequest('Data Part 3');
}

 
async function processData() {
  for await (let data of fetchData()) {
    print(`Received: ${data}`);
    proxy.name = `Updated with ${data}`;
    print(`Current name: ${proxy.name}`);
  }
}

 
processData();
