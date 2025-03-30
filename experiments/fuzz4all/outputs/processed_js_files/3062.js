 
async function fetchData() {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000);
  });
  return data;
}

 
(async function processData() {
  try {
    const data = await fetchData();
    
     
    const transformedData = data.map(num => ({
      original: num,
      squared: num ** 2
    }));

     
    const uniqueSquared = [...new Set(transformedData.map(item => item.squared))];

     
    function* squaredGenerator(arr) {
      for (let value of arr) {
        yield value;
      }
    }

    const generator = squaredGenerator(uniqueSquared);
    
     
    const handler = {
      get: (target, prop, receiver) => {
        if (prop === 'next') {
          const result = Reflect.get(target, prop, receiver).apply(target);
          print(`Accessed: ${result.value}`);
          return result;
        }
        return Reflect.get(target, prop, receiver);
      }
    };
    
    const proxiedGenerator = new Proxy(generator, handler);

     
    let result;
    while (!(result = proxiedGenerator.next()).done) {
       
    }

  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
