 

 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const loggingHandler = {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value);
  }
};

 
async function fetchDataSimulation() {
  return new Promise(resolve => setTimeout(() => resolve("Fetched data"), 1000));
}

 
const cache = new Map();

async function getCachedData(key) {
  if (cache.has(key)) {
    print("Returning cached data");
    return cache.get(key);
  }
  const data = await fetchDataSimulation();
  cache.set(key, data);
  print("Data fetched and cached");
  return data;
}

 
const dataObject = new Proxy({}, loggingHandler);

 
(async () => {
  print("Starting complex JavaScript program...");

   
  dataObject.exampleProp = "Test value";
  print(dataObject.exampleProp);

   
  const data1 = await getCachedData("key1");
  print(data1);
  const data2 = await getCachedData("key1");
  print(data2);

   
  const fib = fibonacci();
  print(`Fibonacci: ${fib.next().value}, ${fib.next().value}, ${fib.next().value}`);
})();
