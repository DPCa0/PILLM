 

 
const fetchUser = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));  
  return { id, name: `User${id}` };
};

 
async function* userGenerator(ids) {
  for (const id of ids) {
    yield await fetchUser(id);
  }
}

 
const createUserProxy = (user) => {
  return new Proxy(user, {
    get: (target, prop) => {
      print(`Accessing property ${prop}`);
      return target[prop];
    },
  });
};

 
async function getUsersWithProxy(ids) {
  const users = [];
  for await (const user of userGenerator(ids)) {
    users.push(createUserProxy(user));
  }
  return users;
}

 
(async () => {
  const ids = [1, 2, 3];
  const users = await getUsersWithProxy(ids);
  users.forEach((user) => {
    print(user.name);  
  });
})();
