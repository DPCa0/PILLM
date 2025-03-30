 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { user: { id: 1, name: 'Alice' } }, meta: { timestamp: Date.now() } });
    }, 1000);
  });
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Getting property: ${prop}`);
      return prop in obj ? obj[prop] : null;
    },
    set: (obj, prop, value) => {
      print(`Setting property: ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

(async () => {
   
  const { data: { user }, meta } = await fetchData('https://api.example.com/user');
  
   
  const userProxy = createLoggingProxy(user);

   
  print(userProxy.name);  
  userProxy.name = 'Bob';       
  print(userProxy.name);  
  
   
  print(`Data fetched at: ${new Date(meta.timestamp).toLocaleString()}`);
})();
