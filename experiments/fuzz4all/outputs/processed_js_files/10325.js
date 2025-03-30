 
(async () => {
   
  const userData = new Map();

   
  const fetchUserData = (userId) => new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User${userId}`, age: 20 + userId });
    }, 1000);
  });

   
  const userDataProxy = new Proxy(userData, {
    set: (target, key, value) => {
      print(`Setting data for userId ${key}`);
      target.set(key, value);
      return true;
    },
    get: (target, key) => {
      print(`Getting data for userId ${key}`);
      return target.get(key);
    }
  });

   
  const loadAndLogUserData = async (userId) => {
    if (!userDataProxy.has(userId)) {
      print(`Fetching data for userId ${userId}...`);
      const data = await fetchUserData(userId);
      userDataProxy.set(userId, data);
    }
    print(`UserData: ${JSON.stringify(userDataProxy.get(userId))}`);
  };

   
  await Promise.all([loadAndLogUserData(1), loadAndLogUserData(2), loadAndLogUserData(1)]);
})();
