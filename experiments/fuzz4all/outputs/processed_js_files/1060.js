 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fetchDataInChunks() {
  yield delay(1000).then(() => "Data chunk 1");
  yield delay(1000).then(() => "Data chunk 2");
  yield delay(1000).then(() => "Data chunk 3");
}

 
async function processChunks() {
  const generator = fetchDataInChunks();
  for (let promise of generator) {
    const chunk = await promise;
    print(`Processed: ${chunk}`);
  }
}

 
const targetObject = { value: 42 };
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessing property '${prop}'`);
    return Reflect.get(...arguments);
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to ${value}`);
    return Reflect.set(...arguments);
  }
};

const proxy = new Proxy(targetObject, handler);

 
print(`Value: ${proxy.value}`);
proxy.value = 100;

 
processChunks();
