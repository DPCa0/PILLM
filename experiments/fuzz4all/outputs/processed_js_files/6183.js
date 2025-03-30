 
async function* fetchUserData(userIds) {
  for (const id of userIds) {
    const response = await fetch(`https: 
    const userData = await response.json();
    yield userData;
  }
}

 
const logUserDetails = ({ id, name, email }) => {
  print(`User ID: ${id}, Name: ${name}, Email: ${email}`);
};

 
class UserService {
  #userCache = new Map();

  static #instance;
  
  constructor() {
    if (UserService.#instance) {
      return UserService.#instance;
    }
    UserService.#instance = this;
  }

   
  cacheUserData(user) {
    this.#userCache.set(user.id, user);
  }

   
  async getUserData(userIds) {
    const uncachedIds = userIds.filter(id => !this.#userCache.has(id));
    for await (const userData of fetchUserData(uncachedIds)) {
      this.cacheUserData(userData);
    }
    return userIds.map(id => this.#userCache.get(id));
  }
}

(async () => {
  const userService = new UserService();
  const userIds = [1, 2, 3];
  const users = await userService.getUserData(userIds);
  users.forEach(logUserDetails);
})();
