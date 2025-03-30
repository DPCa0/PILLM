 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve(['apple', 'banana', 'cherry', 'date', 'elderberry']), 1000);
});

 
async function processData() {
  try {
    const fruits = await fetchData();
    
     
    const fruitSet = new Set(fruits);
    
     
    const fruitMap = new Map([...fruitSet].map((fruit, index) => [index, fruit.toUpperCase()]));
    
     
    fruitMap.forEach((fruit, index) => {
      print(`Fruit ${index + 1}: ${fruit}`);
    });

     
    const fruitsArray = [...fruitMap.values()];
    print(`All fruits: ${fruitsArray.join(', ')}`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

 
processData();
