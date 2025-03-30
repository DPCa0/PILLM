 

 
function* fetchData() {
  yield new Promise((resolve) => setTimeout(() => resolve("Data part 1"), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve("Data part 2"), 2000));
  return "All data fetched";
}

 
async function handleGenerator(gen) {
  let result = { done: false };

  while (!result.done) {
    result = gen.next();
    if (result.value instanceof Promise) {
      print(await result.value);
    }
  }
  print(result.value);  
}

 
const target = { data1: "Info 1", data2: "Info 2" };
const handler = {
  get: (obj, prop) => {
    print(`Accessing property: ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);

 
(async () => {
  print("Starting data fetch using generators and async/await...");
  await handleGenerator(fetchData());

  print("\nUsing Proxy to monitor object access:");
  print(proxy.data1);
  proxy.data2 = "Updated Info 2";
  print(proxy.data2);
})();
