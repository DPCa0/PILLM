 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000);
  });
}

 
(async function() {
  try {
     
    const fruits = await fetchData();
    
     
    const fruitObjects = fruits.map((fruit, index) => ({ id: index, name: fruit }));

     
    const uniqueFruits = new Set(fruits);

     
    const combinedData = [...fruitObjects, ...Array.from(uniqueFruits).map((name, id) => ({ id: id + 100, name }))];

     
    const handler = {
      get(target, prop) {
        if (prop in target) {
          print(`Accessing property ${prop}`);
          return target[prop];
        }
        print(`Property ${prop} not found`);
        return null;
      }
    };
    const proxiedData = new Proxy(combinedData, handler);

     
    const [firstFruit, ...otherFruits] = proxiedData;

     
    print(`First fruit: ${firstFruit.name}, Other fruits count: ${otherFruits.length}`);
    
     
    for (const fruit of proxiedData) {
      print(`Fruit ID: ${fruit.id}, Fruit Name: ${fruit.name}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
