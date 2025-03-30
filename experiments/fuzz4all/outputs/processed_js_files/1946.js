 

 
const metaSymbol = Symbol('metadata');

 
const asyncHandler = {
  get: function (target, prop, receiver) {
    if (prop === 'getData') {
      return async function () {
        print('Fetching data...');
        const response = await fetch(target.url);
        const data = await response.json();
        Reflect.set(target, prop, data);
        return data;
      };
    }
    return Reflect.get(target, prop, receiver);
  },
  set: function (target, prop, value) {
    if (prop === 'setData') {
      target[metaSymbol] = { timestamp: new Date().toISOString() };
      Reflect.set(target, 'getData', value);
      print(`Data updated at: ${target[metaSymbol].timestamp}`);
      return true;
    }
    return Reflect.set(target, prop, value);
  }
};

 
const targetObject = {
  url: 'https://jsonplaceholder.typicode.com/todos/1'
};

 
const proxyObject = new Proxy(targetObject, asyncHandler);

 
async function fetchDataAndLog() {
  const data = await proxyObject.getData();
  print('Data fetched:', data);

   
  proxyObject.setData = { title: 'Updated Title' };
  print('Updated data:', proxyObject.getData);
}

 
fetchDataAndLog();
