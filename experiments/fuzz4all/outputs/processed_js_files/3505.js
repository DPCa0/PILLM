 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'John Doe', role: 'Developer' };
      resolve(data);
    }, 1000);
  });
};

 
const processData = async () => {
  try {
     
    const data = await fetchData();
    
     
    const { id, name, role } = data;
    print(`User Info: ID = ${id}, Name = ${name}, Role = ${role}`);

     
    const userMap = new Map();
    userMap.set(id, { name, role });

     
    const userProxy = new Proxy(userMap, {
      get: (target, prop) => {
        print(`Accessing property "${prop}"`);
        return target.get(prop);
      }
    });

     
    const userInfo = userProxy.get(id)?.name ?? 'Unknown User';
    print(`Fetched User: ${userInfo}`);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
processData();
