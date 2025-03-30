 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        '/api/user': { id: 1, name: 'Alice' },
        '/api/admin': { id: 2, name: 'Bob', role: 'admin' }
      };
      if (data[url]) {
        resolve(data[url]);
      } else {
        reject('404: Not Found');
      }
    }, 1000);
  });
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property ${prop} not found. Defaulting to 'Unknown'.`);
      return 'Unknown';
    }
  }
};

async function main() {
  try {
    const userData = await fetchData('/api/user');
    const adminData = await fetchData('/api/admin');
    
     
    const user = new Proxy(userData, handler);
    const admin = new Proxy(adminData, handler);

    print(`User: ${user.name}, Role: ${user.role}`);  
    print(`Admin: ${admin.name}, Role: ${admin.role}`);  

  } catch (error) {
    console.error('Error:', error);
  }
}

 
main();
