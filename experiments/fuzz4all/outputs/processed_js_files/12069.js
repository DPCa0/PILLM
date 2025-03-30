 

class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello, ${this.name}!`;
  }
}

const delayedUpperCase = (str) =>
  new Promise((resolve) => setTimeout(() => resolve(str.toUpperCase()), 1000));

async function asyncGreet(user) {
  const message = user.greet();
  const loudMessage = await delayedUpperCase(message);
  print(loudMessage);
}

 
const userHandler = {
  get(target, prop, receiver) {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const user = new Proxy(new User("Alice"), userHandler);

asyncGreet(user);

user.name = "Bob";  
print(user.name);  
