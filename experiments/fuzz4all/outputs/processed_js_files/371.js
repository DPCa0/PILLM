 
async function fetchDataAndProcess() {
   
  const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { numbers: [10, 20, 30, 40, 50], error: null };
      data.error ? reject('Error fetching data') : resolve(data);
    }, 1000);
  });

  try {
     
    const result = await fetchData;
    
     
    const { numbers } = result;
    const squaredNumbers = numbers.map(num => num ** 2);

     
    const extendedNumbers = [...squaredNumbers, 100, 121];

     
    const uniqueNumbers = [...new Set(extendedNumbers)];

     
    const handler = {
      get(target, property) {
        if (property in target) {
          print(`Accessing ${property}: ${target[property]}`);
          return target[property];
        } else {
          throw new ReferenceError(`Property "${property}" does not exist.`);
        }
      }
    };
    
    const numbersProxy = new Proxy(uniqueNumbers, handler);

     
    uniqueNumbers.forEach((_, index) => {
      print(numbersProxy[index]);
    });

  } catch (error) {
     
    console.error(`Failed: ${error}`);
  }
}

 
fetchDataAndProcess();
