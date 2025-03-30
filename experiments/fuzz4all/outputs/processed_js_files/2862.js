 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ user: "Alice", age: 30 });
    }, 1000);
  });
}

 
const userHandler = {
  get(target, property) {
    print(`Getting property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
async function initialize() {
  const { user, age } = await fetchData();
  const userModule = await import('./userModule.js');

   
  const userProxy = new Proxy({ user, age }, userHandler);

   
  print(userProxy?.user ?? "Unknown User");
  print(userProxy?.age ?? "Unknown Age");

   
  const userData = new Map();
  userData.set(userProxy.user, { location: "Wonderland", occupation: "Developer" });

   
  for (const [key, value] of userData.entries()) {
    print(`${key} is a ${value.occupation} from ${value.location}`);
  }

   
  userProxy.age = 31;
  print(`Updated age: ${userProxy.age}`);

   
  class User {
    #name;

    constructor(name) {
      this.#name = name;
    }

    getName() {
      return this.#name;
    }
  }

  const userInstance = new User(userProxy.user);
  print(`Private user name: ${userInstance.getName()}`);
}

initialize().catch(console.error);
