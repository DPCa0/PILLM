 

 
const fetchUserData = async (userId) => {
  const mockData = {
    1: { name: 'Alice', age: 30 },
    2: { name: 'Bob', age: 25 },
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockData[userId];
      user ? resolve(user) : reject('User not found');
    }, 1000);
  });
};

 
const createUserDataProxy = (user) => {
  return new Proxy(user, {
    get: (target, prop) => {
      print(`Accessing ${prop} of user`);
      return target[prop];
    },
    set: (target, prop, value) => {
      print(`Setting ${prop} of user to ${value}`);
      target[prop] = value;
      return true;
    },
  });
};

 
(async () => {
  try {
    const userId = 1;
    const userData = await fetchUserData(userId);
    const userProxy = createUserDataProxy(userData);
    
    const { name, age } = userProxy;
    print(`Fetched User: ${name}, Age: ${age}`);

    userProxy.age = 31;  
    print(`Updated User Age: ${userProxy.age}`);  

  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();
