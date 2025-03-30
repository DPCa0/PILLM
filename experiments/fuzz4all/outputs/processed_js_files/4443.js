 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: 'Alice' },
        details: { age: 25, profession: 'Engineer' }
      });
    }, 1000);
  });
};

 
const getUserData = async () => {
  try {
    const { user, details } = await fetchData();
    const { name } = user;
    const { age, profession } = details;

     
    const completeInfo = { ...user, ...details };

    print(`User: ${name}, Age: ${age}, Profession: ${profession}`);
    print('Complete Info:', completeInfo);

     
    const userProxy = new Proxy(completeInfo, {
      get(target, property) {
        print(`Property accessed: ${property}`);
        return target[property];
      }
    });

     
    print(`Proxy User: ${userProxy.name}, Age: ${userProxy.age}`);

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 
getUserData();
