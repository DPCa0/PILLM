 

 
const fetchData = async (id) => {
  const fakeData = { id, name: `Item${id}`, price: (Math.random() * 100).toFixed(2) };
  return new Promise((resolve) => setTimeout(() => resolve(fakeData), 1000));
};

 
function* dataGenerator(ids) {
  for (let id of ids) {
    yield fetchData(id);
  }
}

 
async function handleData(ids) {
  const gen = dataGenerator(ids);
  for (let promise of gen) {
    const { id, name, price } = await promise;
    print(`Fetched Data - ID: ${id}, Name: ${name}, Price: $${price}`);
  }
}

 
const dataProxyHandler = {
  get(target, prop) {
    print(`Accessing property: ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
(async function main() {
  const ids = [1, 2, 3];
  const proxiedIds = new Proxy(ids, dataProxyHandler);
  
  await handleData(proxiedIds);

   
  proxiedIds.push(4);
  await handleData(proxiedIds);
})();
