 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5
        ? resolve({ data: 'Fetched Data', status: 200 })
        : reject(new Error('Fetch failed'));
    }, 1000);
  });
};

 
async function processData() {
  try {
    const { data, status } = await fetchData();
    print(`Success: ${status} - ${data}`);
    return transformData(data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return handleError(error);
  }
}

 
const transformData = (data) => {
  return `${data} - Transformed at ${new Date().toISOString()}`;
};

 
const handleError = (error) => {
  console.warn('Handling error:', error.message);
  return 'Default data';
};

 
(async () => {
  const result = await processData();
  print(`Result: ${result}`);
})();

 
const uniqueValues = new Set([1, 2, 2, 3, 4]);
uniqueValues.add(5);
uniqueValues.add(3);  

print('Unique Values:', Array.from(uniqueValues));

 
const user = { name: 'Alice', age: 25 };
const { name = 'Anonymous', occupation = 'Unknown' } = user;

print(`User: ${name}, Occupation: ${occupation}`);
