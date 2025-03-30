 
class Person {
   
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  static greet() {
    return "Hello!";
  }
}

 
const handler = {
  get: function(target, property) {
    if (property === 'greet') {
      return function() {
        return `${target.greet()} Nice to meet you.`;
      };
    }
    return target[property];
  }
};

 
const EnhancedPerson = new Proxy(Person, handler);

 
const personInstance = new EnhancedPerson('John Doe');

 
const { getName } = personInstance;
print(getName.apply(personInstance));  

 
print(EnhancedPerson.greet());  

 
(async () => {
  const delayedHello = new Promise((resolve) => {
    setTimeout(() => resolve("Hello after 1 second!"), 1000);
  });

  const message = await delayedHello;
  print(message);  
})();
