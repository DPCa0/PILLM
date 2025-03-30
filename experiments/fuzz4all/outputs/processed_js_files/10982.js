 

 
const fetchData = () => new Promise(resolve => {
  setTimeout(() => resolve({ a: 1, b: 2, c: 3, d: 4 }), 1000);
});

 
const processData = async () => {
  try {
     
    const { a, b, ...rest } = await fetchData();
    
     
    const combinedData = { ...rest, e: 5, f: 6 };
    
     
    const result = Object.values(combinedData)
      .map(value => value * 2)
      .reduce((acc, curr) => acc + curr, a + b);
    
    print(`Processed result: ${result}`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
processData();
