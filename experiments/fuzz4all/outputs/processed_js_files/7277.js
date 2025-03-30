 

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const data = new Proxy({ count: 0 }, handler);

 
async function fetchData() {
   
  return new Promise(resolve => setTimeout(() => resolve(42), 1000));
}

 
function* processData() {
  print("Starting data process...");
  data.count++;
  const result = yield fetchData();
  data.count = result;
  print(`Data processed: ${data.count}`);
}

 
async function runGenerator(gen) {
  const iterator = gen();
  let result = iterator.next();
  while (!result.done) {
    const value = await result.value;
    result = iterator.next(value);
  }
}

 
runGenerator(processData);
