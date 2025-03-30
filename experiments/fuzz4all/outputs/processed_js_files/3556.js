 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ user: "Alice", age: 30 }), 1000);
  });
};

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

 
(async () => {
  const data = await fetchData();
  const proxyData = new Proxy(data, handler);

  print(proxyData.user);  
  proxyData.age = 31;           
  print(proxyData.age);   

   
  const [userName, userAge] = await Promise.all([
    Promise.resolve(proxyData.user),
    Promise.resolve(proxyData.age),
  ]);

  print(`User: ${userName}, Age: ${userAge}`);
})();
