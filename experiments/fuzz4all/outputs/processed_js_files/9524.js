 

async function fetchData() {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        age: 30,
      });
    }, 1000);
  });
}

 
const handler = {
  get: function (target, property, receiver) {
    if (property in target) {
      print(`Accessing property '${property}': ${target[property]}`);
      return Reflect.get(target, property, receiver);
    } else {
      print(`Property '${property}' does not exist`);
      return undefined;
    }
  },
  set: function (target, property, value, receiver) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  },
};

 
const uniqueProp = Symbol("unique");

 
(async function () {
  let data = await fetchData();
  
   
  let proxyData = new Proxy(data, handler);
  
   
  proxyData[uniqueProp] = "UniqueValue";

   
  print(proxyData.name);
  proxyData.age = 35;
  print(proxyData.age);

   
  print(proxyData[uniqueProp]);
  
   
  print(proxyData.address);
})();
