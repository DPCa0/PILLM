 

 
async function* fetchData() {
  const data = [
    { id: 1, name: 'Alice', age: 28 },
    { id: 2, name: 'Bob', age: 34 },
    { id: 3, name: 'Charlie', age: 22 }
  ];
  
  for (let item of data) {
     
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    yield item;
  }
}

 
const defaultHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting ${prop}: ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property ${prop} not found, returning default`);
      return 'N/A';   
    }
  }
};

(async () => {
   
  const dataGen = fetchData();
  let result = await dataGen.next();
  
  while (!result.done) {
    const data = result.value;
    
     
    const proxyData = new Proxy(data, defaultHandler);
    
     
    print(`User ID: ${proxyData.id}, Name: ${proxyData.name}, Age: ${proxyData.age}, Email: ${proxyData.email}`);
    
     
    result = await dataGen.next();
  }
})();
