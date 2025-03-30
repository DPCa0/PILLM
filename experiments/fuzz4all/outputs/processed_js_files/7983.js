 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ id: 1, name: 'John Doe', age: 30 });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const processData = async (url) => {
  try {
    const data = await fetchData(url);
    
     
    const { id, name, age } = data;
    print(`Fetched data - ID: ${id}, Name: ${name}, Age: ${age}`);

     
    const dataMap = new Map();
    dataMap.set(id, { name, age });

     
    const proxiedData = new Proxy(dataMap.get(id), handler);
    
     
    print(proxiedData.name);

     
    proxiedData.age = 31;
    print(`Updated Age: ${proxiedData.age}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

 
processData('https://api.example.com/data');
