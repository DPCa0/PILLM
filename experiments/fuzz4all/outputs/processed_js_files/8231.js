 

 
function* fetchData(ids) {
  for (let id of ids) {
    yield new Promise(resolve => 
      setTimeout(() => resolve(`Data for ID: ${id}`), Math.random() * 1000)
    );
  }
}

 
async function processGenerator(generator) {
  const results = [];
  for (let promise of generator) {
    results.push(await promise);
  }
  return results;
}

 
const dataHandler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
(async () => {
  const ids = [1, 2, 3, 4, 5];
  const dataGenerator = fetchData(ids);
  const data = await processGenerator(dataGenerator);

  const dataObject = new Proxy({ fetchedData: data }, dataHandler);

  print(dataObject.fetchedData);

   
  dataObject.newProp = 'Test';
  print(dataObject.newProp);
})();
