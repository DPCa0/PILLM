 

 
const INTERNAL_ID = Symbol('internalId');

 
const userHandler = {
  get(target, property) {
    if (property === 'info') {
      return `User ID: ${target[INTERNAL_ID]}, Name: ${target.name}`;
    }
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    if (property === 'name') {
      print(`Setting name to ${value}`);
    }
    return Reflect.set(target, property, value);
  }
};

 
async function fetchUserDetails(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: 'Alice' });
    }, 1000);
  });
}

 
const users = new Map();

 
async function initializeUser(userId) {
  const userDetails = await fetchUserDetails(userId);

  const user = new Proxy({
    [INTERNAL_ID]: userDetails.id,
    name: userDetails.name
  }, userHandler);

  users.set(userId, user);
  return user;
}

 
(async () => {
  const user = await initializeUser(1);
  print(user.info);  
  user.name = 'Bob';
  print(user.info);  
})();
