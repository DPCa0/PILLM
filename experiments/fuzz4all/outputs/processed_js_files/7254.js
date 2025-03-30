 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: 'John Doe', age: 30, location: 'New York' };
      resolve(data);
    }, 1000);
  });
};

 
async function getUserData() {
  try {
    print('Fetching user data...');
    const userData = await fetchData();
    print('User data fetched:', userData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const userHandler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing property "${property}" with value "${target[property]}"`);
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist on the user object.`);
      return undefined;
    }
  },
  set: (target, property, value) => {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
};

 
const user = { name: 'Alice', age: 25 };
const proxyUser = new Proxy(user, userHandler);

 
print(proxyUser.name);  
proxyUser.location = 'San Francisco';  
print(proxyUser.location);  

 
getUserData();
