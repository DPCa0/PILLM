 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'apple', 'orange', 'banana', 'kiwi']);
    }, 1000);
  });
};

 
const processData = async () => {
  const rawData = await fetchData();
  
   
  const uniqueFruits = new Set(rawData);
  
   
  const fruitCountMap = new Map();
  
   
  rawData.forEach(fruit => {
    fruitCountMap.set(fruit, (fruitCountMap.get(fruit) || 0) + 1);
  });

  return { uniqueFruits: [...uniqueFruits], fruitCountMap };
};

 
const handler = {
  get(target, prop) {
    print(`Accessed property: ${prop}`);
    return target[prop];
  }
};

(async () => {
  const data = await processData();
  
   
  const proxyData = new Proxy(data, handler);
  
   
  print('Unique Fruits:', proxyData.uniqueFruits);
  print('Fruit Count Map:', proxyData.fruitCountMap);
  
   
  proxyData.uniqueFruits.forEach(fruit => {
    print(`${fruit}:`, proxyData.fruitCountMap.get(fruit));
  });
})();
