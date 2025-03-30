 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, value: 'data' });
    }, 1000);
  });
};

 
const dataHandler = {
  get(target, prop, receiver) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Property '${prop}' set to '${value}'`);
    return Reflect.set(target, prop, value, receiver);
  },
};

 
(async () => {
  const dataProxy = new Proxy({}, dataHandler);

  print('Fetching data...');
  const data = await fetchData();

  Object.assign(dataProxy, data);
  print(`Fetched Data ID: ${dataProxy.id}`);
  print(`Fetched Data Value: ${dataProxy.value}`);

  dataProxy.value = 'new data';

   
  Reflect.set(dataProxy, 'extra', 'additional data');
  print(`Extra Property: ${Reflect.get(dataProxy, 'extra')}`);
})();
