 
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 
const user = {
  name: 'Anonymous',
  loggedIn: false,
};

const userHandler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
};

const proxiedUser = new Proxy(user, userHandler);

 
const userMap = new Map();

(async () => {
   
  const userData = await fetchUserData(1);
  if (userData) {
    userMap.set(userData.id, userData);
  }

   
  const userSecret = Symbol('secret');
  proxiedUser[userSecret] = 'TopSecret';

   
  proxiedUser.name = userData?.name || 'No Name';
  print(`User Name: ${proxiedUser.name}`);
  print(`User Secret: ${proxiedUser[userSecret]}`);

   
  for (let [key, value] of userMap.entries()) {
    print(`User ID: ${key}, Name: ${value.name}`);
  }
})();
