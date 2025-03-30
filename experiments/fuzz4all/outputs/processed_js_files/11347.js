 

const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 35 },
        { id: 3, name: 'Charlie', age: 30 }
      ]);
    }, 1000);
  });
};

const processData = async () => {
  try {
    const data = await fetchData();
    const adults = data.filter(({ age }) => age >= 30);  
    const names = adults.map(({ name }) => name);  
    print('Adults:', names);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

processData();
