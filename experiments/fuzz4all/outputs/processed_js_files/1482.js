 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'JavaScript', version: 'ES2023', features: ['async/await', 'Proxy', 'destructuring'] });
    }, 2000);
  });
};

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property '${prop}'`);
    return target[prop];
  }
};

 
const displayData = async () => {
  const data = await fetchData();
  
   
  const { name, version, features } = data;
  
   
  const proxyData = new Proxy(data, handler);

  print(`Framework: ${name}`);
  print(`Version: ${version}`);
  
   
  print(`Features: ${proxyData.features.join(', ')}`);
};

 
displayData();
