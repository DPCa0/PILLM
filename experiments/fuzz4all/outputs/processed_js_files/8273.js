 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      print(`Getting property '${property}'`);
      return Reflect.get(target, property, receiver);
    } else {
      throw new Error(`Property '${property}' does not exist.`);
    }
  },
  set(target, property, value, receiver) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  }
};

const target = { name: 'John Doe', age: 30 };
const proxy = new Proxy(target, handler);

 
try {
  print(proxy.name);   
  proxy.age = 31;            
  print(proxy.height);  
} catch (e) {
  console.error(e.message);
}

 
async function* asyncGenerator() {
  yield Promise.resolve('First value');
  yield Promise.resolve('Second value');
  yield Promise.resolve('Third value');
}

 
(async () => {
  for await (const value of asyncGenerator()) {
    print(value);  
  }
})();

 
const person = {
  greet() {
    print('Hello!');
  }
};

Reflect.apply(person.greet, person, []);  

 
const data = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...rest } = data;
print(a, b, rest);  

 
class MyClass {
  #privateField = 42;
  
  getPrivateField() {
    return this.#privateField;
  }
}

const instance = new MyClass();
print(instance.getPrivateField());  

 
const promises = [
  Promise.resolve(1),
  Promise.reject('Error occurred'),
  Promise.resolve(3)
];

Promise.allSettled(promises).then(results => 
  results.forEach(result