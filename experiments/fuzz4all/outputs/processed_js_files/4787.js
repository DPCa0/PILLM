 
const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { userId: 1, userName: 'JohnDoe', email: 'john@example.com' };
      resolve(data);
    }, 2000);
  });
};

 
const handler = {
  get: (target, property) => {
    print(`Getting property "${property}"`);
    return Reflect.get(target, property);
  },
  set: (target, property, value) => {
    print(`Setting property "${property}" to "${value}"`);
    return Reflect.set(target, property, value);
  }
};

 
const main = async () => {
  try {
     
    const userData = await fetchData();

     
    const proxyUserData = new Proxy(userData, handler);

     
    const { userId, userName, email = 'no-reply@example.com' } = proxyUserData;

     
    print(`UserID: ${userId}`);
    print(`UserName: ${userName}`);
    print(`Email: ${email}`);

     
    proxyUserData.userName = 'JaneDoe';
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
main();
