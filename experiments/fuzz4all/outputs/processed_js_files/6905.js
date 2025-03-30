 

 
async function fetchData(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data for ID: ${id}`), 1000);
  });
}

 
const dataHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property ${prop} doesn't exist, performing async operation`);
      return async (id) => await fetchData(id);
    }
  },
};

 
const api = new Proxy({}, dataHandler);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
(async () => {
  const ids = idGenerator();

  for (let i = 0; i < 3; i++) {
    const id = ids.next().value;
    const data = await api.getData(id);
    print(data);
  }
})();
