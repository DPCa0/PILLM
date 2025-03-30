 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000);
});

 
function* dataGenerator(dataArray) {
  for (let item of dataArray) {
    yield item;
  }
}

 
async function getDataGenerator() {
  const data = await fetchData();
  return dataGenerator(data);
}

 
const generatorHandler = {
  get: (target, prop) => {
    if (prop === 'next') {
      print('Accessing next item...');
    }
    return Reflect.get(target, prop);
  }
};

 
(async function main() {
  const dataGen = await getDataGenerator();
  const proxiedGen = new Proxy(dataGen, generatorHandler);
  let result;
  while (!(result = proxiedGen.next()).done) {
    print(result.value);
  }
})();
