 

 
const fetchData = (delay, data) => new Promise(resolve => setTimeout(() => resolve(data), delay));

 
function* dataGenerator() {
  yield fetchData(1000, 'Data 1');
  yield fetchData(2000, 'Data 2');
  yield fetchData(1500, 'Data 3');
}

 
async function processData(generator) {
  const dataGen = generator();
  for await (let data of dataGen) {
    print(await data);
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting property '${prop}'`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

 
const targetObject = {
  key1: 'value1',
  key2: 'value2'
};

 
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.key1;        
proxyObject.key3 = 'v3'; 

 
processData(dataGenerator);

 
const user = {
  name: "Alice",
  address: {
    city: "Wonderland",
  }
};

print(user.address?.city ?? 'Unknown City');  
print(user.contact?.email ?? 'No Email');     
