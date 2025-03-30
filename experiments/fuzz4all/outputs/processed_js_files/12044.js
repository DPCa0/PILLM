 

 
async function fetchData(endpoint) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${endpoint}` });
    }, Math.random() * 2000);
  });
}

 
function createDataFetcher() {
  const cache = new Map();

  return async function (endpoint) {
    if (cache.has(endpoint)) {
      print(`Cache hit for ${endpoint}`);
      return cache.get(endpoint);
    } else {
      print(`Fetching data for ${endpoint}`);
      const response = await fetchData(endpoint);
      cache.set(endpoint, response);
      return response;
    }
  };
}

 
const getData = createDataFetcher();

 
const handler = {
  get: function (target, property) {
    if (property in target) {
      print(`Getting property ${property}`);
      return target[property];
    } else {
      print(`Property ${property} does not exist`);
      return undefined;
    }
  },
};

 
const user = {
  name: 'Alice',
  age: 30,
};

const proxyUser = new Proxy(user, handler);

 
(async function () {
  print(await getData('https://api.example.com/user/1'));
  print(await getData('https://api.example.com/user/1'));  

   
  print(proxyUser.name);
  print(proxyUser.email);  
})();
