 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'JavaScript', type: 'Language', year: 1995 });
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Property '${property}' accessed: ${target[property]}`);
      return target[property];
    }
    print(`Property '${property}' does not exist.`);
    return undefined;
  },
};

 
async function displayLanguageDetails() {
  try {
    const data = await fetchData();
    
     
    const proxyData = new Proxy(data, handler);
    
     
    print(`Language: ${proxyData.name}`);
    print(`Type: ${proxyData.type}`);
    print(`Year: ${proxyData.year}`);
    print(`Popularity: ${proxyData.popularity}`);  
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

displayLanguageDetails();
