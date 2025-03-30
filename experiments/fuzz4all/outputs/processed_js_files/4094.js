 

 
async function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, data: `Data for ID ${id}` });
    }, 1000);
  });
}

 
function* dataFetcher(ids) {
  for (const id of ids) {
    yield fetchData(id);
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property '${prop}'`);
    return prop in target ? target[prop] : 'Property not found';
  }
};

const dataCache = new Proxy({}, handler);

(async function main() {
  const ids = [1, 2, 3];
  const generator = dataFetcher(ids);

  for (let promise of generator) {
    const result = await promise;
    dataCache[result.id] = result.data;
  }

  print(dataCache[1]);
  print(dataCache[2]);
  print(dataCache[3]);
})();
