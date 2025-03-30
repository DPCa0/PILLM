 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
      ]);
    }, 1000);
  });
};

 
async function processData() {
  try {
    const data = await fetchData();

     
    const extractedData = data.map(({ id, name }) => ({ id, name }));

     
    const adults = extractedData.filter(({ id }) => id > 1).map(({ name }) => name);

    print('Extracted Data:', extractedData);
    print('Names of adults:', adults.join(', '));

     
    const extendedData = [...data, { id: 4, name: 'Dave', age: 40 }];
    const [first, ...others] = extendedData;
    
    print('First entry:', first);
    print('Other entries:', others);
  } catch (error) {
    console.error('Error:', error);
  }
}

processData();
