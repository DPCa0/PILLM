 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, value: 10 },
        { id: 2, value: 20 },
        { id: 3, value: 30 }
      ]);
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const data = await fetchData();
    const results = data.map(({ id, value }) => ({
      id,
      doubledValue: value * 2
    }));
    const total = results.reduce((acc, { doubledValue }) => acc + doubledValue, 0);
    print('Processed Data:', results);
    print('Total of doubled values:', total);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
processData();
