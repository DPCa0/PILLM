 
async function* fetchDataGenerator(urls) {
  for (const url of urls) {
    yield new Promise((resolve) => setTimeout(() => resolve(`Fetched data from ${url}`), Math.random() * 1000));
  }
}

 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      print(`Getting value of ${property}`);
      return Reflect.get(target, property, receiver);
    } else {
      console.error(`Property ${property} does not exist`);
    }
  },
  set(target, property, value, receiver) {
    print(`Setting value of ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

const targetObject = { prop1: 42 };
const proxy = new Proxy(targetObject, handler);

 
const metaDataMap = new WeakMap();
metaDataMap.set(targetObject, { description: "This is a target object." });

 
async function runDemo() {
   
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  for await (const data of fetchDataGenerator(urls)) {
    print(data);
  }

   
  print(proxy.prop1);  
  proxy.prop2 = 100;  
  print(proxy.prop3);  

   
  if (metaDataMap.has(targetObject)) {
    print(metaDataMap.get(targetObject));
  }
}

runDemo();
