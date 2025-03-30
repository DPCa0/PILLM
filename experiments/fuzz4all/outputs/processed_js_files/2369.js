 
class Person {
  #name;
  constructor(name) {
    this.#name = name;
  }
  
  getName() {
    return this.#name;
  }
}

 
const handler = {
  get: function(target, property, receiver) {
    print(`Accessing property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set: function(target, property, value) {
    print(`Setting property: ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};

 
const john = new Person('John Doe');
const proxyJohn = new Proxy(john, handler);

 
async function fetchName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(proxyJohn.getName()), 1000);
  });
}

 
Promise.allSettled([
  fetchName(),
  Promise.reject('Simulated Error')
]).then(results => {
  for (let result of results) {
    if (result.status === 'fulfilled') {
      print(`Fulfilled: ${result.value}`);
    } else {
      print(`Rejected: ${result.reason}`);
    }
  }
});

 
print(proxyJohn?.getName?.());
print(proxyJohn?.nonExistentMethod?.());
