 
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  async greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === 'function') {
      return async (...args) => {
        print(`Calling method: ${prop}`);
        const result = await Reflect.apply(target[prop], target, args);
        print(`Method ${prop} executed successfully.`);
        return result;
      };
    } else {
      print(`Accessing property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} with value: ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
(async () => {
  const user = new User("Alice", 30);
  const proxyUser = new Proxy(user, handler);
  
  print(proxyUser.name);   
  proxyUser.age = 31;            
  
  const message = await proxyUser.greet();   
  print(message);                      
})();
