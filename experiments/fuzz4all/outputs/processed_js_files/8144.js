Certainly! Below is a JavaScript program that demonstrates advanced features such as asynchronous programming with `async/await`, the use of `Map` and `Set`, destructuring, and template literals:

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', roles: ['admin', 'user'] },
        { id: 2, name: 'Bob', roles: ['user'] },
        { id: 3, name: 'Charlie', roles: ['moderator', 'user'] }
      ]);
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const data = await fetchData();  
    const userMap = new Map();  
    const uniqueRoles = new Set();  

    data.forEach(({ id, name, roles }) => {
      userMap.set(id, { name, roles });  
      roles.forEach(role => uniqueRoles.add(role));  
    });

     
    userMap.forEach(({ name, roles }, id) => {
      print(`User ID: ${id}, Name: ${name}, Roles: ${roles.join(', ')}`);
    });

     
    print(`Unique Roles: ${[...uniqueRoles].join(', ')}`);

  } catch (error) {
    console.error('Error processing user data:', error);
  }
};

 
processUserData();

This code demonstrates the creation and usage of promises, asynchronous functions, modern collections (`Map` and `Set`), as well as destructuring assignment and template literals to manipulate and display data.