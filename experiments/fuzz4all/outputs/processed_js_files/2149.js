 

 
const fetchData = (delay, data) => new Promise((resolve) => setTimeout(() => resolve(data), delay));

 
function* dataGenerator() {
  yield fetchData(1000, { id: 1, value: 'data 1' });
  yield fetchData(2000, { id: 2, value: 'data 2' });
  yield fetchData(1500, { id: 3, value: 'data 3' });
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessing ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
};

 
async function processData() {
  const generator = dataGenerator();
  for await (let dataPromise of generator) {
    const data = await dataPromise;
    const proxiedData = new Proxy(data, handler);
    print(`Processed: ${proxiedData.value}`);
  }
}

 
processData();
