 

 
function* fetchDataGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve('Data chunk 1'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Data chunk 2'), 2000));
  yield new Promise(resolve => setTimeout(() => resolve('Data chunk 3'), 1000));
}

 
async function processData() {
  const dataGen = fetchDataGenerator();
  let result = dataGen.next();

  while (!result.done) {
    const data = await result.value;
    print(`Processed: ${data}`);
    result = dataGen.next();
  }
}

 
const target = { data: "initial" };
const handler = {
  get: (obj, prop) => {
    print(`Getting ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
proxy.data = "updated";
print(proxy.data);

 
processData();
