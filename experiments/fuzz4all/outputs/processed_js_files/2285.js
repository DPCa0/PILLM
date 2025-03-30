 
async function* fetchUserData(ids) {
  for (const id of ids) {
    yield new Promise((resolve) => {
      setTimeout(() => resolve({ id, name: `User${id}` }), Math.random() * 1000);
    });
  }
}

 
const userDataHandler = {
  set(target, property, value) {
    print(`Setting value ${value} at position ${property}`);
    target[property] = value;
    return true;
  }
};

const users = new Proxy([], userDataHandler);

 
async function processUsers(ids) {
  const userGenerator = fetchUserData(ids);
  const processingTasks = [];

   
  for await (const userPromise of userGenerator) {
    const task = userPromise.then(user => {
      users.push(user);
      print(`Processed: ${user.name}`);
    });
    processingTasks.push(task);
  }

  await Promise.all(processingTasks);
  print('All users processed:', users);
}

 
const userIds = [1, 2, 3, 4, 5];
processUsers(userIds);
