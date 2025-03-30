 

 
const fetchData = (delay, data) => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

 
async function processData() {
  try {
    const data1 = await fetchData(1000, 'Hello');
    const data2 = await fetchData(500, 'Advanced');
    const data3 = await fetchData(300, 'JavaScript');
    return `${data1}, ${data2} ${data3}!`;
  } catch (error) {
    throw new Error('Error processing data');
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property '${property}'`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  },
};

 
const targetObject = { message: 'Initial Message' };

 
const proxyObject = new Proxy(targetObject, handler);

 
async function displayMessage() {
  proxyObject.message = await processData();  
  print(proxyObject.message);  
}

displayMessage();
