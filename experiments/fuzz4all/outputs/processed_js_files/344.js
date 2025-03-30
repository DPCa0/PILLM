 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      url ? resolve({ name: 'Alice', age: 30 }) : reject('Invalid URL');
    }, 1000);
  });
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    throw new ReferenceError(`Property "${property}" does not exist.`);
  }
};

 
async function getUserData(url) {
  try {
    const data = await fetchData(url);
    const proxyData = new Proxy(data, handler);
    print(`User: ${proxyData.name}, Age: ${proxyData.age}`);
    
     
    print(proxyData.email);  
  } catch (error) {
    console.error(error);
  }
}

 
(async () => {
  await getUserData('http://example.com/user');
})();
