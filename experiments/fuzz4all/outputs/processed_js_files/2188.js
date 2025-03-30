 

 
function fetchData(endpoint) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${endpoint} data`), 1000);
  });
}

 
function* dataGenerator() {
  yield fetchData('api/user');
  yield fetchData('api/posts');
  yield fetchData('api/comments');
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property ${property}`);
    return property in target ? target[property] : 'Property not found';
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const apiData = {
  user: null,
  posts: null,
  comments: null
};

 
const proxyApiData = new Proxy(apiData, handler);

 
async function processGenerator(gen) {
  for (let promise of gen) {
    let result = await promise;
    print('Fetched:', result);
  }
}

(async () => {
   
  const gen = dataGenerator();

   
  await processGenerator(gen);

   
  proxyApiData.user = 'John Doe';
  print(proxyApiData.user);
  print(proxyApiData.nonExistentProperty);  
})();
