 

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const userHandler = {
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

 
async function fetchUserData(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User${id}`, age: 20 + id });
    }, 1000);
  });
}

 
(async function main() {
  const gen = idGenerator();
  const userId = gen.next().value;

  print('Fetching user data...');
  const userData = await fetchUserData(userId);

  const user = new Proxy(userData, userHandler);

  print('User data:', user);
  print('User name:', user.name);

  user.age = 30;
  print('Updated user age:', user.age);
})();
