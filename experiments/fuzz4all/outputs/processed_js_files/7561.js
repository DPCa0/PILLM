 

 
const fetchData = (delay, data) => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));

 
async function* asyncDataGenerator() {
  yield await fetchData(1000, { id: 1, name: 'Item 1' });
  yield await fetchData(2000, { id: 2, name: 'Item 2' });
  yield await fetchData(1500, { id: 3, name: 'Item 3' });
}

 
const loggingHandler = {
  get: (target, prop, receiver) => {
    print(`Getting property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const uniqueKey = Symbol('uniqueKey');

 
const createProxyWithSymbol = (obj) => {
  obj[uniqueKey] = 'Unique Data';
  return new Proxy(obj, loggingHandler);
};

 
(async function() {
  const dataProxy = createProxyWithSymbol({});  
  for await (const item of asyncDataGenerator()) {
    print('Fetched:', item);
    dataProxy[item.id] = item.name;   
  }

  print('Proxy object state:', dataProxy);
  print('Accessing unique key:', dataProxy[uniqueKey]);
})();
