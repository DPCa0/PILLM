 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 24 },
        { id: 3, name: 'Charlie', age: 35 },
      ]);
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const data = await fetchData();
    
     
    const processedData = data
      .map(({ id, name, age }) => ({ id, name: name.toUpperCase(), isAdult: age >= 18 }))
      .filter(user => user.isAdult);

     
    const summary = processedData.reduce((acc, user) => {
      acc.totalAdults += 1;
      acc.names.push(user.name);
      return acc;
    }, { totalAdults: 0, names: [] });

    print('Processed Data:', processedData);
    print('Summary:', summary);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
(async () => {
  await processData();
})();
