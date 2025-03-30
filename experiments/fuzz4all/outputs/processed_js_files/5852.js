 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: 'Jane Doe', role: 'Admin' };  
      Math.random() > 0.5 ? resolve(data) : reject('Fetch error');
    }, 1000);
  });
}

 
(async () => {
  try {
     
    const { user: userName, role: userRole } = await fetchData('https://api.example.com/user');
    print(`User fetched: ${userName}, Role: ${userRole}`);
    
     
    const permissions = new Map([
      ['Admin', ['read', 'write', 'delete']],
      ['User', ['read', 'write']],
    ]);

    if (!permissions.has(userRole)) throw new Error('Invalid role');
    
    const userPermissions = new Set(permissions.get(userRole));
    print(`Permissions for ${userRole}: ${[...userPermissions].join(', ')}`);
    
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();

 
const userHandler = {
  set(target, prop, value) {
    if (prop === 'role' && !['Admin', 'User'].includes(value)) {
      throw new Error('Invalid role assignment');
    }
    target[prop] = value;
  }
};

const user = new Proxy({ user: 'John Doe', role: 'User' }, userHandler);
try {
  user.role = 'Guest';  
} catch (error) {
  console.error(`Proxy error: ${error.message}`);
}
