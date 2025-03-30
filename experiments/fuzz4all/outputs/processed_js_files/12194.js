 

 
function* dataGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve('Data 1'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Data 2'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Data 3'), 1000));
}

 
async function fetchData() {
  const dataGen = dataGenerator();
  for (let dataPromise of dataGen) {
    const data = await dataPromise;
    print(`Fetched: ${data}`);
  }
}

 
const monitoredObject = { name: 'Proxy Monitor', status: 'active' };
const handler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};
const proxy = new Proxy(monitoredObject, handler);

 
proxy.status = 'inactive';
proxy.name = 'Advanced Proxy';

 
const privateData = new WeakMap();
class SecretKeeper {
  constructor(secret) {
    privateData.set(this, secret);
  }
  
  reveal() {
    return privateData.get(this);
  }
}

const secretInstance = new SecretKeeper('Top Secret Info');
print(`Revealed secret: ${secretInstance.reveal()}`);

 
fetchData();
