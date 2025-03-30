 
async function* fetchUserData(userIds) {
  for (const id of userIds) {
    yield fetch(`https: 
      .then(response => response.json());
  }
}

 
const loggingHandler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const userData = {
  users: []
};

 
const proxyUserData = new Proxy(userData, loggingHandler);

 
(async () => {
  const userIds = [1, 2, 3];

   
  for await (const user of fetchUserData(userIds)) {
     
    const username = user?.username ?? 'Unknown User';
    proxyUserData.users.push(username);
  }

  print('Final user data:', proxyUserData.users);
})();
