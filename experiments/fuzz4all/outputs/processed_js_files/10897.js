 

 
const simulateAsyncOperation = (time, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), time));

 
function* asyncGenerator() {
  yield simulateAsyncOperation(1000, "First");
  yield simulateAsyncOperation(2000, "Second");
  yield simulateAsyncOperation(1500, "Third");
}

 
async function processGenerator(gen) {
  const results = [];
  for await (let value of gen) {
    results.push(value);
    print(`Processed: ${value}`);
  }
  return results;
}

 
const mapHandler = {
  get(target, prop) {
    print(`Accessed key: ${prop}`);
    return target.get(prop);
  },
  set(target, prop, value) {
    print(`Setting key: ${prop} with value: ${value}`);
    target.set(prop, value);
    return true;
  },
};

const map = new Proxy(new Map(), mapHandler);
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);

(async () => {
   
  const generator = asyncGenerator();

   
  const results = await processGenerator(generator);
  
   
  results.forEach((result, index) => {
    map.set(`result-${index}`, result);
  });

   
  print(map.get("result-0"));
  print(map.get("result-1"));
  print(map.get("result-2"));
})();
