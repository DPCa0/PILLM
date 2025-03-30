 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
};

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
async function processData() {
  print('Fetching data...');
  const data = await fetchData();
  print('Data fetched:', data);

  const generator = dataGenerator(data);

  for (let item of generator) {
    print('Processing item:', item);
  }
}

 
const handler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Setting property "${property}" to "${value}"`);
    return Reflect.set(target, property, value);
  },
};

 
const dataObject = {
  count: 0,
};

 
const proxyData = new Proxy(dataObject, handler);

 
proxyData.count = 1;
print(proxyData.count);

 
processData();
