 

 
function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, data: `Data for ID: ${id}` });
    }, 1000);
  });
}

 
function* dataGenerator(ids) {
  for (let id of ids) {
    yield fetchData(id);
  }
}

 
async function processGenerator(gen) {
  for await (let dataPromise of gen) {
    const data = await dataPromise;
    print(data);
  }
}

 
const targetObject = {
  prop1: 'value1',
  prop2: 'value2'
};

const handler = {
  get(target, prop) {
    print(`Getting property: ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const proxiedObject = new Proxy(targetObject, handler);

 
(async function main() {
  const ids = [101, 102, 103];
  const generator = dataGenerator(ids);

  print('Processing data with generator and async/await:');
  await processGenerator(generator);

  print('\nWorking with Proxied Object:');
  print(proxiedObject.prop1);   
  proxiedObject.prop2 = 'newValue';   
  print(proxiedObject.prop2);   
})();
