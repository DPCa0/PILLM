 

 
const fetchUserData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        roles: ['admin', 'user'],
      });
    }, 1000);
  });
};

 
const createLoggedSet = () => {
  const handler = {
    get(target, prop, receiver) {
      const originalValue = Reflect.get(...arguments);
      if (typeof originalValue === 'function') {
        return function (...args) {
          print(`Called ${prop} with args: ${JSON.stringify(args)}`);
          return originalValue.apply(this, args);
        };
      }
      return originalValue;
    },
    set(target, prop, value, receiver) {
      print(`Set property ${prop} to ${value}`);
      return Reflect.set(...arguments);
    }
  };

  return new Proxy(new Set(), handler);
};

 
(async () => {
  const userSet = createLoggedSet();
  
   
  const user = await fetchUserData();
  
   
  const { name, roles } = user;
  print(`User Name: ${name}`);
  
   
  roles.forEach(role => userSet.add(role));
  
   
  print(`Roles stored in set:`);
  userSet.forEach(role => print(role));
})();
