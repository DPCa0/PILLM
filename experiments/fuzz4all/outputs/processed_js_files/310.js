 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new ReferenceError(`Property ${prop} does not exist`);
    }
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const targetObject = {
  a: 1,
  b: 2
};

 
const proxyObject = new Proxy(targetObject, handler);

 
const { a, b } = proxyObject;

 
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

 
for (const num of numberGenerator()) {
  print(num);  
}

 
const asyncFunction = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Resolved!"), 1000);
  });
  
  print("Awaiting promise...");
  const result = await promise;
  print(result);
};

 
asyncFunction();

 
class MyClass {
  #privateField = 42;

  #privateMethod() {
    return this.#privateField;
  }

  publicMethod() {
    return this.#privateMethod();
  }
}

 
const myClassInstance = new MyClass();
print(myClassInstance.publicMethod());  
