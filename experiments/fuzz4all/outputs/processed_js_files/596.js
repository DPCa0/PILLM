 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Alice', age: 30, occupation: 'Engineer' });
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return target[property];
    } else {
      throw new Error(`Property ${property} not found`);
    }
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const asyncOperation = async () => {
  try {
    const data = await fetchData();
    const proxyData = new Proxy(data, handler);

    print(proxyData.name);  
    print(proxyData.age);   

    proxyData.age = 31;  
    print(proxyData.age);   
  } catch (error) {
    console.error(error);
  }
};

 
asyncOperation();
