 

(async () => {
   
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
      ]);
    }, 1000);
  });

   
  const processUsers = async () => {
    try {
      const users = await fetchData();

       
      users.forEach(({ id, name, age }) => {
        print(`User ID: ${id}, Name: ${name}, Age: ${age}`);
      });

       
      const averageAge = users.reduce((sum, { age }) => sum + age, 0) / users.length;
      print(`Average Age: ${averageAge}`);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

   
  await processUsers();
})();
