 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { user: { name: "Alice", age: 30 } }, status: 200 });
    }, 1000);
  });
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property '${prop}' with value:`, target[prop]);
      return Reflect.get(...arguments);
    } else {
      console.warn(`Property '${prop}' does not exist.`);
      return undefined;
    }
  },
};

 
(async function() {
  try {
    const url = "https://api.example.com/user";
    
     
    const response = await fetchData(url);

     
    const { data: { user: { name, age } }, status } = response;

     
    const userProxy = new Proxy({ name, age }, handler);

     
    print(`User Name: ${userProxy.name}`);
    print(`User Age: ${userProxy.age}`);
    
     
    print(`User Address: ${userProxy.address}`);

  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
