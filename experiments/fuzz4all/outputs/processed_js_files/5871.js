 

 
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 34 },
        { id: 3, name: 'Charlie', age: 25 }
      ]);
    }, 1000);
  });
}

 
async function processUserData() {
  try {
    const data = await fetchData();
     
    const userMap = new Map(data.map(user => [user.id, user]));
    
     
    const userProxy = new Proxy(userMap, {
      get(target, prop) {
        if (target.has(prop)) {
          print(`Accessing user with ID: ${prop}`);
          return target.get(prop);
        } else {
          print(`User with ID: ${prop} not found`);
          return undefined;
        }
      }
    });
    
     
    print(userProxy.get(1));  
    print(userProxy.get(2));  
    print(userProxy.get(4));  
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

processUserData();
