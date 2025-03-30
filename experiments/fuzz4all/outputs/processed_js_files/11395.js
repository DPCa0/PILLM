 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: 'Alice',
        role: 'admin',
        permissions: ['read', 'write', 'execute']
      });
    }, 1000);
  });
};

 
async function handleData() {
  try {
    const { user, ...details } = await fetchData();
    
     
    const proxy = new Proxy(details, {
      get(target, property) {
        print(`Accessing property "${property}"`);
        return target[property];
      }
    });

    print(`User: ${user}`);
    print(`Role: ${proxy.role}`);
    print(`Permissions: ${[...proxy.permissions].join(', ')}`);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

handleData();
