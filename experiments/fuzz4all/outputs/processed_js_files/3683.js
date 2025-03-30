 

 
const logger = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const user = new Proxy({
  name: 'Alice',
  age: 30
}, logger);

 
const usersSet = new Set();
const usersMap = new Map();

 
async function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User${id}` });
    }, 1000);
  });
}

 
async function asyncOperations() {
  try {
     
    const user1 = await fetchUser(1);
    usersSet.add(user1);
    usersMap.set(user1.id, user1.name);

     
    print(user.name);
    user.age = 31;

     
    usersSet.forEach(u => print(`Set user: ${JSON.stringify(u)}`));
    usersMap.forEach((name, id) => print(`Map user: ID ${id}, Name ${name}`));

  } catch (error) {
    console.error('Error:', error);
  }
}

 
asyncOperations();
