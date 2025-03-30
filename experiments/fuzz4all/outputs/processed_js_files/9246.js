 
async function fetchUserData(userId) {
   
  await new Promise(resolve => setTimeout(resolve, 100));
   
  return { id: userId, name: `User${userId}`, age: Math.floor(Math.random() * 50) + 20 };
}

 
function* userIdGenerator(maxId) {
  for (let i = 1; i <= maxId; i++) {
    yield i;
  }
}

 
const userProxyHandler = {
  get: (target, prop) => {
    print(`Accessing property: ${prop}`);
    return target[prop];
  }
};

 
(async () => {
  const ids = userIdGenerator(5);  
  const fetchedUsers = [];

  for (const id of ids) {
    const userData = await fetchUserData(id);
    const proxiedUser = new Proxy(userData, userProxyHandler);  
    fetchedUsers.push(proxiedUser);
  }

   
  const [firstUser, ...restUsers] = fetchedUsers;
  print(`First fetched user: ${firstUser.name}`);

   
  restUsers.forEach(user => {
    print(`User name: ${user?.name ?? 'Unknown'}, Age: ${user?.age ?? 'Unknown'}`);
  });

   
  const userTemplate = (strings, ...values) =>
    strings.reduce((result, str, i) => `${result}${str}<strong>${values[i] || ''}</strong>`, '');
  
  print(userTemplate`Summary: Total users fetched: ${fetchedUsers.length}`);
})();
