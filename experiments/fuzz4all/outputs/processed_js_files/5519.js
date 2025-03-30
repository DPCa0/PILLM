 

 
function* promiseGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve("First Promise Resolved!"), 1000));
  yield new Promise(resolve => setTimeout(() => resolve("Second Promise Resolved!"), 1000));
  yield new Promise(resolve => setTimeout(() => resolve("Third Promise Resolved!"), 1000));
}

 
async function asyncFunction(gen) {
  for await (let promise of gen) {
    print(promise);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const targetObj = { message: "Hello Proxy!" };
const proxy = new Proxy(targetObj, handler);

 
class MyClass {
  static staticMethod() {
    print("This is a static method.");
  }

  instanceMethod() {
    print("This is an instance method.");
  }
}

 
MyClass.staticMethod();
const myInstance = new MyClass();
myInstance.instanceMethod();

 
proxy.message = "New message!";
print(proxy.message);

 
const gen = promiseGenerator();
asyncFunction(gen);
