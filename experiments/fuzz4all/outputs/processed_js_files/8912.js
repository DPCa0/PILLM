 

 
async function* asyncNumberGenerator() {
  for (let i = 1; i <= 5; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}': ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property '${prop}' not found.`);
      return 'N/A';
    }
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

const obj = { name: "AdvancedJS" };
const proxy = new Proxy(obj, handler);

proxy.name;  
proxy.version = "ES2023";  
print(proxy.version);  
print(proxy.nonExistent);  

 
(async function () {
  const gen = asyncNumberGenerator();
  for await (const num of gen) {
    print(`Generated number: ${num}`);
  }
})();
