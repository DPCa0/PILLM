 

 
async function* fetchData(endpoints) {
  for (const endpoint of endpoints) {
    const response = await fetch(endpoint);
    const data = await response.json();
    yield data;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const sampleData = {
  user: 'Alice',
  role: 'Admin'
};

const proxiedData = new Proxy(sampleData, handler);

 
(async function() {
  const endpoints = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];
  
  const dataGen = fetchData(endpoints);
  
  for await (let data of dataGen) {
    print('Fetched data:', data);
  }

   
  try {
    print(proxiedData.user);   
    proxiedData.age = 30;            
    print(proxiedData.age);    
    print(proxiedData.nonExistentProp);   
  } catch (error) {
    console.error(error.message);
  }
})();
