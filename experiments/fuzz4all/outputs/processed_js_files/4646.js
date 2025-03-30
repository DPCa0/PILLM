 
const generateUniqueId = (() => {
  let id = 0;
  return () => Symbol(`id_${++id}`);
})();

 
const users = new Map();

 
class User {
  #id;
  #name;
  #email;

  constructor(name, email) {
    this.#id = generateUniqueId();
    this.#name = name;
    this.#email = email;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getEmail() {
    return this.#email;
  }

   
  static create(name, email) {
    const user = new User(name, email);
    users.set(user.getId(), user);
    return user;
  }

   
  static findById(id) {
    return users.get(id) || null;
  }
}

 
const user1 = User.create('Alice', 'alice@example.com');
const user2 = User.create('Bob', 'bob@example.com');

 
const cloneUser = ({ getName, getEmail }) => {
  return { name: getName(), email: getEmail() };
};

const aliceClone = { ...cloneUser(user1) };

 
const fetchUserData = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = User.findById(userId);
      user ? resolve(user) : reject('User not found');
    }, 1000);
  });
};

(async () => {
  try {
    const fetchedUser = await fetchUserData(user1.getId());
    print(`Fetched User: ${fetchedUser.getName()}, ${fetchedUser.getEmail()}`);
  } catch (error) {
    console.error(error);
  }
})();

 
print('Cloned User:', aliceClone);
