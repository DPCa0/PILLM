 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const handler = {
  get: (target, prop) => {
    return prop in target ? target[prop] : 'Property does not exist';
  },
  set: (target, prop, value) => {
    print(`Setting value '${value}' to '${prop}'`);
    target[prop] = value;
    return true;
  },
};

const createComplexObject = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    const proxyData = new Proxy(data, handler);

    print(proxyData.name);  
    print(proxyData.nonExistentProp);  
    
    proxyData.newProp = 'New Value';  
    print(proxyData.newProp);  

  } catch (error) {
    console.error('Error:', error);
  }
};

createComplexObject();
