 
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve({ data: 'Sample Data' });
    } else {
      reject(new Error('Failed to fetch data'));
    }
  }, 1000);
});

 
const processData = async () => {
  try {
    const { data } = await fetchData();
    print(`Received: ${data}`);

     
    const uniqueChars = [...new Set(data.split(''))].map(char => char.toUpperCase());
    print(`Unique Characters: ${uniqueChars.join(', ')}`);

     
    if (uniqueChars.includes('S')) {
      const { specialFunction } = await import('./specialModule.js');
      specialFunction();
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

 
const handleMultipleRequests = async () => {
  const requests = [fetchData(), fetchData(), fetchData()];
  const results = [];

  for await (const result of requests) {
    results.push(result);
  }

  print('All Results:', results);
};

 
processData();
handleMultipleRequests();

Note: This code assumes that there is a `specialModule.js` file available in the same directory with a `specialFunction` exported.