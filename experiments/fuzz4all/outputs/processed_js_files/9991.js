 
const complexFunction = async () => {
   
  const userRoles = new Map();
  const uniqueIds = new Set();

   
  userRoles.set('Alice', 'Admin').set('Bob', 'User').set('Charlie', 'Guest');
  
   
  const fetchUserData = (user) => new Promise((resolve) => {
    setTimeout(() => resolve({ userId: `${user}_ID`, name: user }), 1000);
  });

  for (const user of userRoles.keys()) {
    const { userId, name } = await fetchUserData(user);
    
     
    uniqueIds.add(userId);
    
     
    const role = userRoles.get(name);
    
     
    print(taggedOutput`User: ${name}, ID: ${userId}, Role: ${role}`);
  }

   
  for (const id of uniqueIds.values()) {
    print(`Unique ID recorded: ${id}`);
  }
};

 
function taggedOutput(strings, ...values) {
  return strings.reduce((result, str, i) => `${result}${str}${values[i] || ''}`, '').toUpperCase();
}

 
(async () => {
  await complexFunction();
})();
