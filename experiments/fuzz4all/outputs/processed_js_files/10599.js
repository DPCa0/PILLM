 

 
const fetchData = (id) => {
  return new Promise((resolve) => {
    const timeout = Math.floor(Math.random() * 2000) + 500;
    setTimeout(() => {
      resolve(`Data for ID: ${id}`);
    }, timeout);
  });
};

 
const dataCache = {};
const handler = {
  get(target, prop, receiver) {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxiedCache = new Proxy(dataCache, handler);

 
async function getData(id) {
  if (!proxiedCache[id]) {
    print(`Fetching data for ID: ${id}`);
    const data = await fetchData(id);
    proxiedCache[id] = data;
  } else {
    print(`Cache hit for ID: ${id}`);
  }
  return proxiedCache[id];
}

 
(async () => {
  print(await getData(1));
  print(await getData(2));
  print(await getData(1));  
  print(await getData(3));
})();
