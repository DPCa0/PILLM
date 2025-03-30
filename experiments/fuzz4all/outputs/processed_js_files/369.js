 

 
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User${userId}`, age: Math.floor(Math.random() * 100) });
    }, 2000);
  });
}

 
function* userDataProcessor(userIds) {
  for (let id of userIds) {
    print(`Fetching data for user ${id}`);
    const data = yield fetchUserData(id);
    print(`Processed data: ${JSON.stringify(data)}`);
  }
}

 
async function processUserDataAsync(generator, userIds) {
  const iterator = generator(userIds);
  let result = iterator.next();

  while (!result.done) {
    result = iterator.next(await result.value);
  }
}

 
const userActionsHandler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const userData = { active: false };
const userProxy = new Proxy(userData, userActionsHandler);

 
userProxy.active = true;
print(userProxy.active);

 
processUserDataAsync(userDataProcessor, [1, 2, 3]);

print('Operation started, awaiting user data...');
