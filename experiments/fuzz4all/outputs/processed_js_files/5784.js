 

 
async function* fetchUserData(userIds) {
  for (let id of userIds) {
     
    const user = await new Promise((resolve) =>
      setTimeout(() => resolve({ id, name: `User${id}` }), 1000)
    );
    yield user;
  }
}

 
const userMap = new Map();

 
const userMapProxy = new Proxy(userMap, {
  set(target, key, value) {
    print(`Adding user with ID: ${key}`);
    target.set(key, value);
    return true;
  },
  get(target, key) {
    print(`Fetching user with ID: ${key}`);
    return target.get(key);
  }
});

 
(async () => {
  const userIds = [1, 2, 3];

   
  for await (let user of fetchUserData(userIds)) {
    userMapProxy.set(user.id, user);
  }

   
  userIds.forEach((id) => {
    print(userMapProxy.get(id));
  });
})();
