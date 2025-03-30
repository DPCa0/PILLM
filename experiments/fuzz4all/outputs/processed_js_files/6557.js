 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       
      const data = [
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 25 },
        { id: 3, name: 'Charlie', age: 35 }
      ];
      resolve(data);
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const data = await fetchData();
    
     
    const transformedData = data.map(({ id, name, age }) => ({ id, name: name.toUpperCase(), isAdult: age >= 18 }));
    
     
    const uniqueNames = new Set(transformedData.map(person => person.name));
    
    print('Transformed Data:', transformedData);
    print('Unique Names:', [...uniqueNames]);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
processData();
