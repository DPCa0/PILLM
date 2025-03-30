 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Advanced JS",
        level: "Expert",
        features: ["Proxy", "Async/Await", "Promises", "ES6"]
      });
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' has been accessed`);
    return target[property];
  }
};

 
(async () => {
  const data = await fetchData();
  
  const proxiedData = new Proxy(data, handler);
  
   
  const { name, level, features } = proxiedData;
  
  print(`Project: ${name}, Level: ${level}`);
  
   
  print(`Features: ${[...features].join(', ')}`);
})();
