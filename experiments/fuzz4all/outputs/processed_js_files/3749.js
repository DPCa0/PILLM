 

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Accessing property "${prop}": ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property "${prop}" is not available`;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const targetObject = {
  name: "Advanced JavaScript",
  version: "ES6+"
};

const proxy = new Proxy(targetObject, handler);

 
async function delayedLog() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("This message is delayed by 2 seconds!");
    }, 2000);
  });

  print(await promise);
}

 
async function advancedFeaturesDemo() {
  const generator = numberGenerator();

  print("First number from generator:", generator.next().value);
  print("Second number from generator:", generator.next().value);

  print(proxy.name);  
  proxy.description = "A program with advanced features";  

  await delayedLog();  
}

advancedFeaturesDemo();
