 

 
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John Doe", role: "developer" });
    }, 1000);
  });
}

 
async function getUserData(userId) {
  try {
    const user = await fetchUserData(userId);

     
    const userProxy = new Proxy(user, {
      get(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop, receiver);
      }
    });

     
    const { id, name, role } = userProxy;
    print(`ID: ${id}, Name: ${name}, Role: ${role}`);
    
    return userProxy;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
(async () => {
  const userIds = [101, 102, 103];
  const userPromises = userIds.map(id => getUserData(id));
  
   
  const users = await Promise.all(userPromises);
  
  print("Fetched user data:", users);
})();
