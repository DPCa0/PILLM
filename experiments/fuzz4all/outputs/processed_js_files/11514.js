 

 
const data = {
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
    { id: 3, name: 'Charlie', role: 'guest' },
  ],
};

 
const hiddenSymbol = Symbol('hidden');

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function getUserById(id) {
  await delay(1000);  
  return data.users.find(user => user.id === id);
}

 
const userProxyHandler = {
  get(target, property, receiver) {
    if (property === hiddenSymbol) {
      return 'This is a hidden property!';
    }
    print(`Property '${property}' accessed.`);
    return Reflect.get(...arguments);
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value);
  },
};

 
(async function() {
  const user = await getUserById(1);
  const proxiedUser = new Proxy(user, userProxyHandler);

  print(proxiedUser.name);  
  proxiedUser.role = 'superadmin';  
  print(proxiedUser[hiddenSymbol]);  
})();
