 
const fetchData = async () => {
   
  const dataPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 25 },
        { id: 3, name: 'Carol', age: 35 }
      ]);
    }, 1000);
  });

   
  const data = await dataPromise;

   
  const [firstUser, ...otherUsers] = data;

  print(`First user: ${firstUser.name}, Age: ${firstUser.age}`);
  print('Other users:', otherUsers.map(user => ({ ...user, active: true })));
};

 
fetchData();
