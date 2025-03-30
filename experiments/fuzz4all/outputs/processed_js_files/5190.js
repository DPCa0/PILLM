 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
const handler = {
  get(target, property) {
    print(`Property '${property}' was accessed.`);
    return target[property];
  }
};

const data = { endpoint1: 'https://api.example.com/data1', endpoint2: 'https://api.example.com/data2' };
const proxiedData = new Proxy(data, handler);

 
function* dataGenerator(endpoints) {
  for (const endpoint of endpoints) {
    yield fetchData(proxiedData[endpoint]);
  }
}

 
(async function() {
  const endpoints = ['endpoint1', 'endpoint2'];
  const generator = dataGenerator(endpoints);
  for await (let promise of generator) {
    print(await promise);
  }
})();

 
const privateData = new WeakMap();

class User {
  constructor(name) {
    this.name = name;
    privateData.set(this, { secret: 'Top Secret Data' });
  }
  
  getSecret() {
    return privateData.get(this).secret;
  }
}

const user = new User('Alice');
print(user.name);  
print(user.getSecret());  

 
const uniqueValues = new Set([1, 2, 2, 3, 4]);
const doubledValues = new Map([...uniqueValues].map(x => [x, x * 2]));

print(doubledValues);  
