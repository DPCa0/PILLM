class User {
  #id;  
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.#id = crypto.randomUUID();
  }

  getId() {
    return this.#id;
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'age') {
      return Reflect.get(target, prop) + " years old";
    }
    return Reflect.get(target, prop);
  }
};

 
async function* generateUsers(names) {
  for (const name of names) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield new User(name, Math.floor(Math.random() * 60) + 18);
  }
}

 
function log(target, key, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    print(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class App {
  constructor(users) {
    this.users = users;
  }

  @log
  addUser(user) {
    this.users.push(new Proxy(user, handler));
  }

  @log
  listUsers() {
    this.users.forEach(user => print(`${user.name}, ${user.age}`));
  }
}

(async () => {
  const userGenerator = generateUsers(['Alice', 'Bob', 'Charlie']);
  const users = [];

  for await (const user of userGenerator) {
    users.push(user);
  }

  const app = new App(users);

  app.listUsers();
  app.addUser(new User('Dave', 28));
  app.listUsers();
})();
