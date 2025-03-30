 

 
const target = { message: "Hello, ", time: "morning" };
const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Getting property ${prop}`);
      return obj[prop];
    } else {
      throw new ReferenceError(`Property "${prop}" does not exist.`);
    }
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
async function fetchData() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      proxy.time = "evening";  
      resolve({ name: "world!" });
    }, 1000);
  });

  const { name } = await promise;  
  print(proxy.message + name);  
}

 
fetchData().catch(console.error);
