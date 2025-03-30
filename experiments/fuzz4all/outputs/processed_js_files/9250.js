 
const randomDelay = () => new Promise(resolve => {
  const delay = Math.floor(Math.random() * 2000);
  setTimeout(resolve, delay);
});

 
const fetchUserData = async () => {
  await randomDelay();  
  return { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' };
};

 
const processUserData = async () => {
  const { id, name, ...rest } = await fetchUserData();
  print(`User ID: ${id}`);
  print(`User Name: ${name}`);
  print('Additional Info:', rest);
};

 
const createLoggingProxy = (target) => new Proxy(target, {
  get: (obj, prop) => {
    print(`Property '${prop}' accessed`);
    return obj[prop];
  }
});

 
const user = createLoggingProxy({ id: 42, username: 'jdoe', role: 'admin' });

 
(async () => {
  await processUserData();
  print(`Username: ${user.username}, Role: ${user.role}`);
})();
