 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["apple", "banana", "cherry", "date", "elderberry"]);
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return target[property];
    } else {
      print(`Property ${property} not found`);
    }
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} with value: ${value}`);
    target[property] = value;
    return true;
  }
};

 
(async function manageFruits() {
   
  const fruits = await fetchData();

   
  const fruitCountMap = new Map();
  fruits.forEach(fruit => fruitCountMap.set(fruit, (fruitCountMap.get(fruit) || 0) + 1));

   
  const uniqueFruits = new Set(fruits);

   
  const proxiedFruitCountMap = new Proxy(fruitCountMap, handler);

   
  uniqueFruits.forEach(fruit => {
    print(`Fruit: ${fruit}, Count: ${proxiedFruitCountMap.get(fruit)}`);
  });

  proxiedFruitCountMap.set("banana", 5);
  print(`Updated banana count: ${proxiedFruitCountMap.get("banana")}`);
})();
