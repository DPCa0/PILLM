 

 
const fetchData = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `Item${id}` });
    }, 1000);
  });
};

 
async function* asyncGenerator(ids) {
  for (const id of ids) {
    yield fetchData(id);
  }
}

 
const handler = {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property '${prop}' does not exist on target`);
      return undefined;
    }
  }
};

 
(async () => {
  const ids = [1, 2, 3];
  const gen = asyncGenerator(ids);
  const results = [];

  for await (const itemPromise of gen) {
    const item = await itemPromise;
    const proxiedItem = new Proxy(item, handler);
    results.push(proxiedItem);
  }

  print(results);

   
  print(results[0].name);  
  print(results[0].nonExistentProp);  
})();
