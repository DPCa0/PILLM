 

 
const fetchUserData = (userId) => 
  new Promise((resolve) => 
    setTimeout(() => resolve({ id: userId, name: `User${userId}` }), 1000)
  );

 
function* userIdGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
const fetchAndProcessUsers = async (startId, endId) => {
  const results = [];
  const userGen = userIdGenerator(startId, endId);

  for (const userId of userGen) {
    const userData = await fetchUserData(userId);
    results.push({ ...userData, timestamp: new Date().toISOString() });
  }

  return results;
};

 
const userLogger = (user) => 
  new Proxy(user, {
    get(target, prop) {
      print(`Accessing property "${prop}": ${target[prop]}`);
      return Reflect.get(target, prop);
    },
  });

 
(async () => {
  const users = await fetchAndProcessUsers(1, 3);

   
  users.forEach((user) => {
    const loggedUser = userLogger(user);
    print(loggedUser.name);  
    print(loggedUser.timestamp);  
  });
})();
