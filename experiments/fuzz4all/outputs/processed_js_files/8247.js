 
const complexFunction = async () => {
   
  const fetchData = () => new Promise(resolve => 
    setTimeout(() => resolve(['apple', 'banana', 'cherry', 'date', 'elderberry']), 1000)
  );
  
   
  const data = await fetchData();
  
   
  const [first, , third, ...rest] = data;
  
   
  const uniqueCharacters = new Set(data.join(''));

   
  const transformedData = data
    .filter(fruit => fruit.length > 5)
    .map(fruit => fruit.toUpperCase())
    .reduce((acc, fruit) => ({ ...acc, [fruit]: fruit.length }), {});

   
  function* generateFruits() {
    for (let fruit of data) {
      yield fruit;
    }
  }
  
  const fruitGenerator = generateFruits();

   
  print(`First fruit: ${first}`);
  print(`Third fruit: ${third}`);
  print(`Remaining fruits: ${rest.join(', ')}`);
  print(`Unique Characters: ${[...uniqueCharacters].join(', ')}`);
  print(`Transformed Data:`, transformedData);

   
  print(`Generator outputs:`);
  for (let fruit of fruitGenerator) {
    print(fruit);
  }
};

 
complexFunction();
