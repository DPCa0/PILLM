 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Alice', 'Bob', 'Charlie', 'Dana']);
    }, 1000);
  });
};

 
function* dataGenerator(data) {
  for (const item of data) {
    yield item;
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing element ${prop}: ${target[prop]}`);
      return target[prop];
    }
    return undefined;
  }
};

 
(async () => {
  const names = await fetchData();

   
  const proxiedNames = new Proxy(names, handler);

   
  const [first, ...rest] = proxiedNames;

  print(`First name: ${first}`);
  print(`Other names: ${rest.join(', ')}`);

   
  print('Iterating over names using generator:');
  const generator = dataGenerator(proxiedNames);
  for (const name of generator) {
    print(name);
  }

   
  const nonexistent = proxiedNames[10]?.toUpperCase() ?? 'Not found';
  print(`Attempting to access a nonexistent element: ${nonexistent}`);
})();
