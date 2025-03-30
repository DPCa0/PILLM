 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { user: { id: 1, name: 'John Doe', role: 'admin' } } });
    }, 1000);
  });
};

 
const permissionHandler = (role) => {
  const roles = {
    admin: ['read', 'write', 'delete'],
    user: ['read'],
    guest: [],
  };
  
  return {
    hasPermission: (action) => roles[role].includes(action),
  };
};

 
const main = async () => {
  const url = 'https://example.com/api/user';
  const response = await fetchData(url);
  const { data: { user } } = response;

   
  const permissions = permissionHandler(user.role);
  
   
  const userProxy = new Proxy(user, {
    get: (target, prop) => {
      print(`Accessing ${prop}`);
      return target[prop];
    },
  });
  
   
  print(`User Name: ${userProxy.name}`);
  print(`Can delete: ${permissions.hasPermission('delete')}`);
};

main();
