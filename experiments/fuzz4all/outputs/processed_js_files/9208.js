 

 
const users = [
  { name: 'Alice', age: 28, city: 'New York' },
  { name: 'Bob', age: 35, city: 'Los Angeles' },
  { name: 'Charlie', age: 32, city: 'Chicago' },
];

 
async function fetchUser(index) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users[index];
      user ? resolve(user) : reject('User not found');
    }, 1000);
  });
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting property ${prop}`);
    return prop in target ? target[prop] : 'Property not found';
  },
};

 
(async function displayUserData() {
  try {
    const user = await fetchUser(1);  
    const { name, age, ...rest } = user;  
    const proxiedUser = new Proxy(user, handler);

    print(`User: ${name}, Age: ${age}, City: ${proxiedUser.city}`);  
    print('Additional Info:', rest);
  } catch (error) {
    console.error(error);
  }
})();

 
const clonedUsers = [...users];
print('Cloned Users:', clonedUsers);
