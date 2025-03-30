 

 
const handler = {
  get: function(target, property) {
    if (property in target) {
      print(`Getting ${property}`);
      return target[property];
    } else {
      print(`${property} does not exist, defaulting to 42`);
      return 42;  
    }
  },
  set: function(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
let target = {
  name: "JavaScript",
  version: "ES6"
};

 
let proxy = new Proxy(target, handler);

 
async function asyncOperation() {
  print("Starting async operation...");
  return new Promise((resolve) => {
    setTimeout(() => {
      print("Async operation completed.");
      resolve("Operation Result");
    }, 2000);
  });
}

 
const uniqueKey = Symbol('unique');

(async function main() {
   
  print(proxy.name);
  print(proxy.nonexistent);
  proxy.version = "ESNext";
  print(proxy.version);

   
  let result = await asyncOperation();
  print(result);

   
  proxy[uniqueKey] = "Secret Information";
  print("Unique Key Property:", proxy[uniqueKey]);
})();
