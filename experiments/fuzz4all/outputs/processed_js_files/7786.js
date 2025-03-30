 

 
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { name: 'Alice', age: 25 },
        2: { name: 'Bob', age: 30 },
      };
      const user = users[userId];
      if (user) {
        resolve(user);
      } else {
        reject('User not found');
      }
    }, 1000);
  });
}

 
const handler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return target[prop];
    } else {
      print(`Property "${prop}" not found`);
      return undefined;
    }
  }
};

 
async function displayUserData(userId) {
  try {
    const userData = await fetchUserData(userId);
    const proxyUserData = new Proxy(userData, handler);
    const { name, age } = proxyUserData;

    print(`User Name: ${name}`);
    print(`User Age: ${age}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
displayUserData(1);
displayUserData(3);
