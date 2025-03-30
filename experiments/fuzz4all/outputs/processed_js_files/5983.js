 

 
function* dataGenerator() {
  yield new Promise((resolve) => setTimeout(() => resolve(10), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve(20), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve(30), 1000));
}

 
async function processData(generator) {
  const result = [];
  for await (const data of generator()) {
    result.push(data);
  }
  return result;
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting ${property}: ${target[property]}`);
      return target[property];
    }
    return 'Property not found';
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

 
const dataObject = new Proxy({ a: 1, b: 2, c: 3 }, handler);

 
Reflect.set(dataObject, 'd', 4);
Reflect.deleteProperty(dataObject, 'b');

 
(async () => {
  print('Proxy operations:');
  print(dataObject.a);
  print(dataObject.b);
  print(dataObject.d);

  print('\nProcessing data using async/await with generator:');
  const result = await processData(dataGenerator);
  print('Final result:', result);
})();
