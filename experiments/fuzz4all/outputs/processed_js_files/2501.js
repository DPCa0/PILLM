 
(async () => {
   
  const { randomUUID } = await import('crypto');

   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

   
  const loggerHandler = {
    get: (obj, prop) => {
      print(`Accessed property "${prop}" with value: ${obj[prop]}`);
      return obj[prop];
    }
  };

   
  const user = { id: randomUUID(), name: 'Alice', role: 'Admin' };
  const proxiedUser = new Proxy(user, loggerHandler);

   
  async function fetchUserRole() {
    print('Fetching user role...');
    await delay(1000);
    return proxiedUser.role;  
  }

   
  (async function() {
    try {
      const role = await fetchUserRole();
      print(`Fetched user role: ${role}`);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  })();
})();
