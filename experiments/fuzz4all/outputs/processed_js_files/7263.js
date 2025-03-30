class User {
  #password;
  
  constructor(username, password) {
    this.username = username;
    this.#password = this.#encryptPassword(password);
  }

  #encryptPassword(password) {
    return Array.from(password).map(char => String.fromCharCode(char.charCodeAt() + 5)).join('');
  }
  
  #decryptPassword(encryptedPassword) {
    return Array.from(encryptedPassword).map(char => String.fromCharCode(char.charCodeAt() - 5)).join('');
  }

  authenticate(password) {
    return this.#decryptPassword(this.#password) === password;
  }

  static *loginSequence(users, credentials) {
    for (let { username, password } of credentials) {
      yield { username, authenticated: users.some(user => user.username === username && user.authenticate(password)) };
    }
  }
}

 
const loggerHandler = {
  get: (target, prop, receiver) => {
    print(`Property '${prop.toString()}' was accessed`);
    return Reflect.get(target, prop, receiver);
  },
};

const users = [
  new User("Alice", "secure123"),
  new User("Bob", "password456")
];

const usersProxy = new Proxy(users, loggerHandler);

const loginCredentials = [
  { username: "Alice", password: "secure123" },
  { username: "Charlie", password: "nopassword" }
];

 
(async () => {
  for await (const result of User.loginSequence(usersProxy, loginCredentials)) {
    print(`${result.username}: ${result.authenticated ? "Authenticated" : "Failed"}`);
  }
})();
