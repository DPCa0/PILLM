 
(async () => {
   
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve(['apple', 'banana', 'apple', 'orange']), 1000);
  });

   
  const data = await fetchData();

   
  const uniqueFruits = new Set(data);

   
  const fruitLengthMap = new Map();
  uniqueFruits.forEach(fruit => {
    fruitLengthMap.set(fruit, fruit.length);
  });

   
  const handler = {
    get(target, property, receiver) {
      print(`Getting value for '${property}'`);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      print(`Setting value '${value}' for '${property}'`);
      return Reflect.set(target, property, value, receiver);
    }
  };

  const proxyMap = new Proxy(fruitLengthMap, handler);

   
  for (let [fruit, length] of proxyMap) {
    print(`The length of '${fruit}' is ${length}`);
  }

   
  proxyMap.set('grape', 5);

  print(`After adding 'grape':`);
  for (let [fruit, length] of proxyMap) {
    print(`The length of '${fruit}' is ${length}`);
  }
})();
