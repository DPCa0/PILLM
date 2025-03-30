 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchUserData(userId) {
  await delay(1000);  
  if (userId !== 1) throw new Error('User not found!');
  return { id: 1, name: 'John Doe', age: 30, location: 'New York' };
}

 
function displayUserInfo({ name, age, location }) {
  print(`Name: ${name}, Age: ${age}, Location: ${location}`);
}

 
const userHandler = {
  get: (obj, prop) => {
    print(`Accessing ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

 
(async () => {
  try {
    const userData = await fetchUserData(1);
    const proxiedUser = new Proxy(userData, userHandler);
    
    displayUserInfo(proxiedUser);
    
     
    print(proxiedUser.name);
    proxiedUser.age = 31;
    print(`Updated Age: ${proxiedUser.age}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
