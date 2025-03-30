 


 
const fetchDataModule = (() => {
   
  const data = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 }
  ];

   
  const fetchData = (timeout = 1000) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, timeout);
    });
  };

  return {
    fetchData
  };
})();

 
(async () => {
  try {
     
    const result = await fetchDataModule.fetchData();

     
    const [{ id, name, age }] = result;

     
    print(`User ID: ${id}, Name: ${name}, Age: ${age}`);

     
    const userSummaries = result.map(({ name, age }) => `${name} is ${age} years old`);

     
    print('User Summaries:', userSummaries);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
