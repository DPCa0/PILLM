 

 
const handler = {
  get(target, prop, receiver) {
    print(`Property '${prop.toString()}' accessed`);
    return Reflect.get(target, prop, receiver);
  }
};

const data = {
  name: "Advanced JS",
  version: "1.0",
  features: ["Proxy", "Async/Await", "Generators", "Map", "Set"]
};

const proxyData = new Proxy(data, handler);

 
async function fetchData(url) {
  print("Fetching data...");
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

 
function* featureIterator(features) {
  for (let feature of features) {
    yield feature;
  }
}

 
const featureMap = new Map();
const uniqueFeatures = new Set();

for (let feature of proxyData.features) {
  featureMap.set(feature, feature.length);
  uniqueFeatures.add(feature);
}

 
for (let [key, value] of featureMap) {
  print(`${key}: ${value} characters`);
}

 
print(`Unique Features: ${[...uniqueFeatures].join(', ')}`);

 
const iterator = featureIterator(proxyData.features);
print("Iterating features:");
let next = iterator.next();
while (!next.done) {
  print(next.value);
  next = iterator.next();
}

 
fetchData('https://jsonplaceholder.typicode.com/todos/1').then(data => print(data));
