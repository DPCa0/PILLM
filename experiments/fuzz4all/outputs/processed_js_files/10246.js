 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function* asyncNumberGenerator() {
  for (let i = 1; i <= 5; i++) {
    await delay(500);  
    yield i;
  }
}

 
const logHandler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};

 
const targetObject = { name: "JavaScript", version: 2023 };
const proxy = new Proxy(targetObject, logHandler);

async function run() {
  print(`Program name: ${proxy.name}, Version: ${proxy.version}`);
  
  proxy.version = 2024;  

  print("Generated numbers with delay:");
  
  for await (const num of asyncNumberGenerator()) {
    print(num);
  }
}

run();
