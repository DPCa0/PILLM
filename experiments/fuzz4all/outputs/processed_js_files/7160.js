 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
  print('Fetching data...');
  await delay(2000);
  print('Data fetched.');
  return { data: 'Sample Data' };
}

 
function* dataProcessor() {
  const data = yield fetchData();
  print('Processing data:', data);
  yield delay(1000);
  print('Data processed.');
}

 
function run(generator) {
  const iterator = generator();

  function iterate(iteration) {
    if (iteration.done) return iteration.value;
    const promise = iteration.value;
    return promise.then(x => iterate(iterator.next(x)));
  }

  return iterate(iterator.next());
}

 
const handler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Set ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const targetObject = { name: 'Sample Object' };
const proxyObject = new Proxy(targetObject, handler);

 
const uniqueFeature = Symbol('feature');
proxyObject[uniqueFeature] = 'This is a unique feature.';

 
print(proxyObject.name);
proxyObject.name = 'New Name';
print(proxyObject[uniqueFeature]);

 
run(dataProcessor);
