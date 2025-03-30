 

 

 
const users = [
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 34 },
  { id: 3, name: 'Carol', age: 23 }
];

 
const fetchUserDetails = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.id === id);
      user ? resolve(user) : reject(new Error('User not found'));
    }, 1000);
  });
};

 
const displayUserInfo = async (id) => {
  try {
    const { name, age } = await fetchUserDetails(id);
    print(`User: ${name}, Age: ${age}`);
  } catch (error) {
    console.error(error.message);
  }
};

 
const updateUser = (id, updatedProperties) => {
  users.forEach((user, index) => {
    if (user.id === id) {
      users[index] = { ...user, ...updatedProperties };
    }
  });
};

 
const sumAges = (...ages) => ages.reduce((total, age) => total + age, 0);

 
displayUserInfo(1);  
updateUser(2, { age: 35 });  
print(`Total Age: ${sumAges(...users.map(user => user.age))}`);  
