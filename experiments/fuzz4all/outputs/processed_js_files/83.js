 

 
const fetchData = async (delay, data) => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

 
function* idGenerator(start = 0) {
  let id = start;
  while (true) {
    yield id++;
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessed property "${prop}" with value: ${target[prop]}`);
      return target[prop];
    }
    return `Property "${prop}" does not exist on target object.`;
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to value: ${value}`);
    target[prop] = value;
    return true;
  }
};

const dataObject = { name: 'ProxyObject', type: 'Demo' };
const proxiedData = new Proxy(dataObject, handler);

 
const executeDemo = async () => {
  const ids = idGenerator(1);
  
  proxiedData.name = 'AdvancedJS';
  
  for (let i = 0; i < 3; i++) {
    print(`Fetching data for ID: ${ids.next().value}`);
    const data = await fetchData(1000, proxiedData.name);
    print(`Fetched Data: ${data}`);
  }
};

executeDemo();
