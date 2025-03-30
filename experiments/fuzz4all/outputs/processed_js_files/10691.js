 
(async () => {
  const fetchData = async () => {
     
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Alice', age: 28 },
          { id: 2, name: 'Bob', age: 34 },
          { id: 3, name: 'Charlie', age: 22 }
        ]);
      }, 1000);
    });
  };

  try {
     
    const data = await fetchData();
    
     
    const [{ name: firstName }, , { name: thirdName }] = data;

     
    print(`User Names: ${firstName} and ${thirdName}`);

     
    const olderThan25 = data.filter(({ age }) => age > 25);
    const names = olderThan25.map(({ name }) => name).join(', ');

    print(`Users older than 25: ${names}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
