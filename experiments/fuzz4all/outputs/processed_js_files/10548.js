 

 
async function fetchUserData(userId) {
  const mockData = {
    1: { name: 'Alice', age: 30 },
    2: { name: 'Bob', age: 25 }
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockData[userId]) {
        resolve(mockData[userId]);
      } else {
        reject(new Error('User not found'));
      }
    }, 1000);
  });
}

 
async function getUserDetails(userId) {
  try {
    const { name, age } = await fetchUserData(userId);
    print(`User Details: Name - ${name}, Age - ${age}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

 
const userHandler = {
  get(target, property) {
    print(`Accessing ${property} of the user`);
    return target[property];
  }
};

 
(async () => {
  const user = await fetchUserData(1);
  const proxiedUser = new Proxy(user, userHandler);
  print(`Proxied User: ${proxiedUser.name}, ${proxiedUser.age}`);
})();

 
getUserDetails(1);
