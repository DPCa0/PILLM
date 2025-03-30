 
const users = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 34 },
  { name: "Charlie", age: 22 },
  { name: "David", age: 31 }
];

 
const fetchUserData = async (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.name === name);
      user ? resolve(user) : reject(`User ${name} not found.`);
    }, 1000);
  });
};

 
const userProxyHandler = {
  set: (obj, prop, value) => {
    if (prop === 'age' && typeof value !== 'number') {
      throw new Error('Age must be a number');
    }
    obj[prop] = value;
    return true;
  }
};

 
(async () => {
  try {
    const userName = "Alice";
    const user = await fetchUserData(userName);
    
    const proxiedUser = new Proxy(user, userProxyHandler);
    print('Original User:', proxiedUser);

     
    proxiedUser.age = 29; 
    print('Updated Age:', proxiedUser.age);

     
    try {
      proxiedUser.age = 'not a number';  
    } catch (e) {
      print(e.message);
    }

     
    print('User Country:', proxiedUser.country?.toUpperCase() ?? 'Not specified');

  } catch (error) {
    console.error(error);
  }
})();
