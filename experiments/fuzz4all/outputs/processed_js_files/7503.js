 

const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const createProxiedObject = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      if (prop in obj) {
        return obj[prop];
      } else {
        throw new ReferenceError(`Property ${String(prop)} does not exist.`);
      }
    },
    set: (obj, prop, value) => {
      if (typeof value === 'number') {
        obj[prop] = value;
        return true;
      } else {
        throw new TypeError('Values must be numbers');
      }
    },
  });
};

 
const symbolKey = Symbol('uniqueKey');

const dataStorage = createProxiedObject({
  [symbolKey]: 42,
});

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  try {
    const data = await fetchData(url);
    print('Fetched Data:', data);

    dataStorage[symbolKey] = 100;  
    print('Proxied Object:', dataStorage);

     
     

    print('Symbol Value:', dataStorage[symbolKey]);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
