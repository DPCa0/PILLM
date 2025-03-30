 
const fetchUserData = async (id) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'John Doe', age: 30 });
    }, 1000);
  });
};

 
const userHandler = {
  get: (target, prop) => {
    print(`Accessing property '${prop}'`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

 
class UserManager {
  constructor() {
    this.users = new Map();
  }

  async loadUser(id) {
    if (!this.users.has(id)) {
      const userData = await fetchUserData(id);
      const proxiedUser = new Proxy(userData, userHandler);
      this.users.set(id, proxiedUser);
    }
    return this.users.get(id);
  }
}

 
async function* userGenerator(ids) {
  const manager = new UserManager();
  for (const id of ids) {
    yield await manager.loadUser(id);
  }
}

 
(async () => {
  const ids = [1, 2, 3];
  const users = userGenerator(ids);

  for await (const user of users) {
    print(`User loaded: ${user.name}`);
  }
})();
