 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2;  
      if (success) {
        resolve({ data: [1, 2, 3, 4, 5], status: 200 });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
}

 
(async () => {
  try {
    const { data } = await fetchData();
    
     
    const [first, ...rest] = data;
    const max = Math.max(first, ...rest);
    
     
    const squaresMap = new Map(data.map(num => [num, num ** 2]));
    
     
    const uniqueSquares = new Set(squaresMap.values());

     
    print(`Fetched Data: ${JSON.stringify(data)}`);
    print(`Max Value: ${max}`);
    print(`Squares Map: ${JSON.stringify([...squaresMap])}`);
    print(`Unique Squares Set: ${JSON.stringify([...uniqueSquares])}`);
    
     
    print(`Safe Access Example: ${squaresMap.get(10)?.toString() ?? 'Value not found'}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
