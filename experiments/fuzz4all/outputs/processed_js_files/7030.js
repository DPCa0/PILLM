 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId: 1, name: 'John Doe', isActive: true });
    }, 1000);
  });
};

 
const userProxyHandler = {
  get(target, property, receiver) {
    print(`Getting property ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
};

 
(async () => {
  try {
     
    const userData = await fetchData();

     
    const userProxy = new Proxy(userData, userProxyHandler);

     
    const { name, isActive } = userProxy;

     
    print(`User ${name} is currently ${isActive ? 'active' : 'inactive'}.`);

     
    const { default: _ } = await import('lodash');

     
    const clonedUser = _.cloneDeep(userProxy);
    print('Cloned user:', clonedUser);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
