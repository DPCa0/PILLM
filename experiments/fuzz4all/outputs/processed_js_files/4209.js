Certainly! Here is a JavaScript program demonstrating advanced features, including async/await, Promises, and ES6 features like destructuring and spread/rest operators:

 
const fetchUserData = userId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { id: 1, name: 'Alice', age: 28 },
        2: { id: 2, name: 'Bob', age: 32 },
      };
      if (users[userId]) {
        resolve(users[userId]);
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
};

 
async function fetchMultipleUsers(...userIds) {
  try {
    const userPromises = userIds.map(userId => fetchUserData(userId));
    const users = await Promise.all(userPromises);

     
    users.forEach(({ id, name, age }) => {
      print(`User ${id}: ${name}, Age: ${age}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

 
function mergeUserInfo(...userObjects) {
  return userObjects.reduce((acc, user) => {
    return { ...acc, ...user };
  }, {});
}

 
fetchMultipleUsers(1, 2).then(() => {
  const mergedUser = mergeUserInfo(
    { id: 1, location: 'Wonderland' },
    { name: 'Alice', hobbies: ['Reading', 'Chess'] }
  );
  print('Merged User Info:', mergedUser);
});

This code performs asynchronous operations to fetch user data, utilizes modern ES6 features, and demonstrates error handling and data merging.