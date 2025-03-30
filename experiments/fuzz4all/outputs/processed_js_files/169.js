 

 
async function fetchData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: 'Alice', age: 30 });
    }, 1000);
  });
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'name') {
      return `User: ${Reflect.get(...arguments)}`;
    }
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    return Reflect.set(...arguments);
  }
};

 
(async () => {
  try {
     
    const userData = await fetchData(1);
    
     
    const { id, name, age } = userData;

     
    print(`Fetched User - ID: ${id}, Name: ${name}, Age: ${age}`);

     
    const proxyUserData = new Proxy(userData, handler);

     
    print(proxyUserData.name);  

     
    proxyUserData.age = 31;
    print(`Updated Age: ${proxyUserData.age}`);  

     
    proxyUserData.age = 'thirty-two';

  } catch (error) {
    console.error('Error:', error.message);
  }
})();
