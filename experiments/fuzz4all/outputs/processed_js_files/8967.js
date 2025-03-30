 

 
const handler = {
  get(target, property, receiver) {
    print(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(...arguments);
  }
};

 
const targetObj = {
  name: "John",
  age: 30
};

 
const proxyObj = new Proxy(targetObj, handler);

 
async function* fetchData() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  await delay(1000);  
  yield { data: "Data 1" };
  
  await delay(1000);
  yield { data: "Data 2" };
}

 
async function process() {
  print(proxyObj.name);  
  
  proxyObj.age = 31;  
  
  const asyncGen = fetchData();
  
  for await (const item of asyncGen) {
    print("Fetched:", item.data);
    proxyObj.data = item.data;  
  }
}

 
process();
