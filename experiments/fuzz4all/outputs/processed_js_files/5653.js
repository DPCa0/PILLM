 
(async function() {
   
  const usersDB = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 24 },
    { id: 3, name: 'Charlie', age: 29 }
  ];

   
  const { formatUserInfo } = await import('./userFormatter.js');

   
  const getUserById = (id) => new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = usersDB.find(user => user.id === id);
      if (user) resolve(user);
      else reject(`User with id ${id} not found`);
    }, 1000);
  });

   
  try {
    const userIds = [1, 3];  
    const users = await Promise.all(userIds.map(getUserById));  
    users.forEach(user => {
      const { name, age } = user;  
      print(formatUserInfo(name, age));
    });
  } catch (error) {
    console.error(error);  
  }
})();

 
 
 
 
