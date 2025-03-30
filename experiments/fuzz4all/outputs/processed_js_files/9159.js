 

 
const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: 'Jane Doe',
          location: 'Earth'
        },
        metadata: {
          timestamp: Date.now(),
          status: 'active'
        }
      });
    }, 1000);
  });
};

 
const logHandler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  }
};

 
(async () => {
  try {
     
    const { user, metadata } = await fetchData();
    
     
    const proxiedUser = new Proxy(user, logHandler);
    
     
    const tag = (strings, ...values) => 
      strings.reduce((result, str, i) => `${result}${str}<strong>${values[i] || ''}</strong>`, '');
    
     
    const getUserInfo = async (user) => {
      return tag`User ${user.name} is located at ${user.location}. Status: ${metadata.status}`;
    };
    
     
    print(await getUserInfo(proxiedUser));
  } catch (error) {
    console.error('Error:', error);
  }
})();
