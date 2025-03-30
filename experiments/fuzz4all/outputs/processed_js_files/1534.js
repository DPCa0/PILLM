 
const add = x => y => y !== undefined ? add(x + y) : x;

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property '${prop}' with value:`, target[prop]);
      return target[prop];
    }
    return undefined;
  }
};

 
const data = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 }
];

 
const proxyData = new Proxy(data, handler);

 
function* transformData(array) {
  for (let obj of array) {
    yield { ...obj, squaredValue: obj.value ** 2 };
  }
}

 
async function processData() {
  const results = await Promise.all(proxyData.map(async (item) => {
    const squared = item.value ** 2;
    return new Promise(resolve => setTimeout(() => resolve(squared), 100));
  }));
  print('Processed results:', results);
}

 
(async () => {
  for (let transformed of transformData(proxyData)) {
    print('Transformed item:', transformed);
  }
  await processData();

   
  print('Curried sum result:', add(1)(2)(3)(4)());
})();
