 

 
const fetchData = async () => {
   
  return new Promise((resolve) => setTimeout(() => resolve({ data: "Hello, Proxy!" }), 1000));
};

 
const privateDataSymbol = Symbol('privateData');

 
const handler = {
  get: async function(target, prop, receiver) {
    if (prop === 'getData') {
      const data = await fetchData();
      return data.data;
    } else {
      return Reflect.get(...arguments);
    }
  },
  set: function(target, prop, value, receiver) {
    if (prop === privateDataSymbol) {
      console.error("Private property cannot be set directly.");
      return false;
    }
    return Reflect.set(...arguments);
  }
};

 
const target = {
  [privateDataSymbol]: 'This is private data.'
};

 
const proxy = new Proxy(target, handler);

 
(async () => {
  print(await proxy.getData);  
  print(proxy[privateDataSymbol]);  
})();
