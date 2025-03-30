 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve({ data: 'Success Data' }) : reject(new Error('Fetch Error'));
    }, 1000);
  });
};

 
async function getData() {
  try {
    const result = await fetchData();
    print('Data received:', result.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

 
const targetObject = {
  prop1: 'value1',
  prop2: 'value2',
};

const handler = {
  get(target, property, receiver) {
    print(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
};

const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.prop1);  
proxyObject.prop2 = 'new value';  
print(proxyObject.prop2);  

 
getData();
