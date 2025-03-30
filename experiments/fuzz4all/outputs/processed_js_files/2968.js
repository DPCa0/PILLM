 
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

 
const userLogger = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  }
};

 
class User {
  #id;
  #name;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  static async createFromApi(userId) {
    const userData = await fetchUserData(userId);
    if (userData) {
      const userInstance = new User(userData.id, userData.name);
      return new Proxy(userInstance, userLogger);
    }
  }
}

 
(async () => {
  const user = await User.createFromApi(1);
  if (user) {
    print(`User ID: ${user.getId()}`);
    print(`User Name: ${user.getName()}`);
  }
})();
