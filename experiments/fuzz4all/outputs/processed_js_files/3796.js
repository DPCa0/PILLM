 

 
function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, data: `Data for ${id}` });
    }, 1000);
  });
}

 
function* dataGenerator(ids) {
  for (const id of ids) {
    yield fetchData(id);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessing ${prop} property`);
    return Reflect.get(target, prop, receiver);
  }
};

 
async function process(ids) {
  const generator = dataGenerator(ids);

  const results = [];
  for (const promise of generator) {
    const data = await promise;
    results.push(data);
  }

  return results;
}

 
(async () => {
  const ids = [1, 2, 3];
  const proxyIds = new Proxy(ids, handler);

  const data = await process(proxyIds);
  print(data);
})();
