 
const fetchData = async () => {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
  return data;
};

 
const createArrayProxy = (arr) => {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      if (prop === 'first') return target[0];
      if (prop === 'last') return target[target.length - 1];
      return Reflect.get(target, prop, receiver);
    },
  });
};

 
(async () => {
  const data = await fetchData();

   
  const proxyArray = createArrayProxy(data);

   
  function* enhancedIterator(array) {
    for (const item of array) {
      yield `Fruit: ${item}`;
    }
  }

   
  const [firstFruit, ...restFruits] = proxyArray;

  print(`First Fruit: ${firstFruit}`);  
  print(`Last Fruit: ${proxyArray.last}`);  
  print('Other Fruits:', restFruits);

   
  for (const fruit of enhancedIterator(proxyArray)) {
    print(fruit);
  }

   
  const config = { settings: { theme: null } };
  const theme = config.settings?.theme ?? 'default';
  print(`Theme: ${theme}`);
})();
