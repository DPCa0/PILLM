 
async function* userGenerator() {
  const users = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "guest" },
  ];
  for (const user of users) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve({ ...user, timestamp: Date.now() }), 1000)
    );
  }
}

 
function logAccess(obj) {
  return new Proxy(obj, {
    get(target, property) {
      print(`Accessed property "${property}":`, target[property]);
      return Reflect.get(target, property);
    },
  });
}

 
class UserProcessor {
  static usersProcessed = 0;
  #users = [];

  static {
    print("Static block executed. Ready to process users.");
  }

  addUser(user) {
    this.#users.push(logAccess(user));
    UserProcessor.usersProcessed++;
  }

  displayUsers() {
    this.#users.forEach((user) =>
      console.log(`User: ${user.name}, Role: ${user.role}`)
    );
  }

  static displayStats() {
    print(`Total users processed: ${UserProcessor.usersProcessed}`);
  }
}

 
(async () => {
  const userProcessor = new UserProcessor();
  const generator = userGenerator();

  for await (const user of generator) {
    userProcessor.addUser(user);
  }

  userProcessor.displayUsers();
  UserProcessor.displayStats();
})();
