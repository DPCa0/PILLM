 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: 'Alice', age: 30, role: 'Developer' };
      resolve(data);
    }, 1000);
  });
};

 
async function processData() {
  try {
    const { name, ...rest } = await fetchData();  
    const processedData = { ...rest, location: 'Wonderland' };  

     
    const handler = {
      get: (target, property) => {
        if (property in target) {
          return `Value: ${target[property]}`;
        } else {
          return 'Property not found';
        }
      },
      set: (target, property, value) => {
        print(`Setting value '${value}' to '${property}'`);
        target[property] = value;
        return true;
      }
    };

    const proxyData = new Proxy(processedData, handler);

     
    print(proxyData.age);  
    proxyData.age = 31;
    print(proxyData.age);  
    print(proxyData.nonExistentProp);  
  } catch (error) {
    console.error('Error:', error);
  }
}

processData();
