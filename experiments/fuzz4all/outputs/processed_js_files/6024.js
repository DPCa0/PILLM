 

 
const asyncOperation = (value, delay) => new Promise((resolve) => setTimeout(() => resolve(value), delay));

 
const targetObject = {
  name: "Alice",
  age: 30
};

const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting property ${property}: ${target[property]}`);
      return target[property];
    }
    print(`Property ${property} does not exist`);
  },
  set: (target, property, value) => {
    if (property in target) {
      print(`Setting property ${property} to ${value}`);
      target[property] = value;
      return true;
    }
    print(`Property ${property} does not exist`);
    return false;
  }
};

const proxy = new Proxy(targetObject, handler);

async function complexTask() {
   
  try {
    print("Starting complex task...");

     
    let name = proxy.name;  
    proxy.age = 31;  

    let operation1 = await asyncOperation("Step 1 Complete", 1000);
    print(operation1);

    let operation2 = await asyncOperation("Step 2 Complete", 2000);
    print(operation2);

    Reflect.set(proxy, 'name', 'Bob');
    print(`Updated name: ${Reflect.get(proxy, 'name')}`);

    let operation3 = await asyncOperation("Step 3 Complete", 1000);
    print(operation3);

    print("Complex task finished.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
complexTask();
