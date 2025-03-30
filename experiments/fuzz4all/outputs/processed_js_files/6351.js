 

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();

class User {
  constructor(name, email) {
    this.id = ids.next().value;
    this.name = name;
    this.email = email;
  }
}

const fetchData = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, data: `User data for id: ${id}` });
    }, 1000);
  });
};

const userStore = new Set();

const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property ${prop} doesn't exist`;
    }
  },
  set(target, prop, value) {
    if (prop === 'email' && !value.includes('@')) {
      throw new Error('Invalid email');
    }
    target[prop] = value;
    return true;
  }
};

const createUser = (name, email) => {
  const user = new User(name, email);
  const proxyUser = new Proxy(user, handler);
  userStore.add(proxyUser);
  return proxyUser;
};

const displayUsers = async () => {
  const userDataPromises = [...userStore].map(user => fetchData(user.id));
  const userData = await Promise.all(userDataPromises);

  userData.forEach(({ id, data }) => {
    const user = [...userStore].find(user => user.id === id);
    print(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Data: ${data}`);
  });
};

// Usage
const user1 = createUser('Alice', 'alice@example.com');
const user2 = createUser('Bob', 'bob@example.com');
user2.email = 'bob@newdomain.com'; // Updating email
// user2.email = 'bobnewdomain.com';  

displayUsers();
