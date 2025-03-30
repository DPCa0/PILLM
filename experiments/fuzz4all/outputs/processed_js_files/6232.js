 
async function* fetchUserData(userIds) {
  for (let id of userIds) {
    yield fetch(`https: 
  }
}

const handler = {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    console.warn(`Property ${prop} does not exist!`);
    return null;
  },
  set: function(target, prop, value) {
    if (typeof value === 'string' && prop === 'name') {
      target[prop] = value.toUpperCase();
    } else {
      target[prop] = value;
    }
    return true;
  }
};

(async () => {
  const userIds = [1, 2, 3];
  for await (let user of fetchUserData(userIds)) {
    const userProxy = new Proxy(user, handler);
    print(`Fetched User: ${userProxy.name}`);
    userProxy.name = 'new name';   
    print(`Updated User: ${userProxy.name}`);
    print(`Non-existent property: ${userProxy.nonExistentProperty}`);  
  }
})();
