 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'orange', 'apple']);
    }, 1000);
  });
}

 
function* itemGenerator(items) {
  for (let item of items) {
    yield item;
  }
}

 
const setHandler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return target[property];
  },
  has(target, key) {
    print(`Checking existence of "${key}"`);
    return target.has(key);
  },
};

 
async function main() {
  print("Fetching data...");
  const data = await fetchData();

   
  const uniqueItems = new Set(data);
  const proxySet = new Proxy(uniqueItems, setHandler);

  print("Processing items:");
  for (let item of itemGenerator(proxySet)) {
    if (proxySet.has(item)) {
      print(`Unique item: ${item}`);
    }
  }
}

main();
