 

 
const fetchUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: 'John Doe', age: 30 }), 1000)
  );

 
const loggerHandler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

 
async function handleUserData() {
  try {
    const userData = await fetchUserData();

     
    const { id, name, age } = userData;
    print(`Fetched User: ${name}, Age: ${age}, ID: ${id}`);

     
    const userProxy = new Proxy(userData, loggerHandler);

     
    print(`User Name: ${userProxy.name}`);
    userProxy.age = 31;
    print(`Updated Age: ${userProxy.age}`);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

 
handleUserData();
