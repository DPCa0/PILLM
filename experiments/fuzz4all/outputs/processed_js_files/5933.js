 
async function* fetchUserData(userIds) {
  for (const id of userIds) {
     
    const userData = await new Promise(resolve => 
      setTimeout(() => resolve({ id, name: `User ${id}` }), 1000)
    );
    yield userData;
  }
}

 
const defaultUser = { id: 0, name: 'Anonymous' };
const userHandler = {
  get: (target, property) => property in target ? target[property] : defaultUser[property]
};

 
(async function() {
  const userIds = [1, 2, 3];
  const fetchedUsers = [];
  
  for await (const user of fetchUserData(userIds)) {
    const proxyUser = new Proxy(user, userHandler);
    fetchedUsers.push(proxyUser);
  }
  
   
  const [firstUser, ...otherUsers] = fetchedUsers;
  print(`First User: ${firstUser.name}`);
  
  print('Other Users:');
  otherUsers.forEach(({ name }) => print(name));
  
   
  const userMap = new Map(fetchedUsers.map(user => [user.id, user.name]));
  print('User Map:', userMap);
})();
