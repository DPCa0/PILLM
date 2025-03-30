 

 
const target = {
  message: "Hello, World",
  getMessage: function() {
    return this.message;
  }
};

 
const handler = {
  get: function(obj, prop) {
    if (prop in obj) {
      print(`Getting property '${prop}': ${obj[prop]}`);
      return Reflect.get(...arguments);
    }
    print(`Property '${prop}' not found`);
    return undefined;
  },
  set: function(obj, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(...arguments);
  }
};

const proxy = new Proxy(target, handler);

 
const asyncOperation = (message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Operation complete: ${message}`);
    }, 1000);
  });
};

 
async function main() {
  print(proxy.getMessage());  

  proxy.message = "Hello, JavaScript";  

   
  const result = await asyncOperation(proxy.getMessage());
  print(result);
}

 
main();
