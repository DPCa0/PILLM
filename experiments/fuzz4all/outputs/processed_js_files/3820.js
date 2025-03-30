 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve({ userId: 1, userName: 'JohnDoe', roles: ['admin', 'user'] }), 1000);
});

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  }
};

 
function* roleGenerator(roles) {
  for (const role of roles) {
    yield role;
  }
}

 
(async () => {
  try {
     
    const userData = await fetchData();
    
     
    const { userId, userName, roles } = new Proxy(userData, handler);
    
    print(`User ID: ${userId}`);
    print(`User Name: ${userName}`);
    
     
    const rolesIterator = roleGenerator(roles);
    for (const role of rolesIterator) {
      print(`Role: ${role}`);
    }
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
