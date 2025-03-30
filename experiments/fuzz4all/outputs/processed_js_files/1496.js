 

 
function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === 'data') {
        resolve({ id: 1, name: 'Sample Data' });
      } else {
        reject('Endpoint not found');
      }
    }, 1000);
  });
}

 
async function getData() {
  try {
    const data = await fetchData('data');
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    }
    console.warn(`Property "${property}" does not exist.`);
    return null;
  },
  set: (target, property, value) => {
    if (typeof value === 'string') {
      target[property] = value;
      return true;
    } else {
      console.error(`Invalid type for property "${property}". Only strings are allowed.`);
      return false;
    }
  }
};

 
const obj = new Proxy({ greeting: 'Hello' }, handler);

 
print(obj.greeting);  
print(obj.nonexistent);  
obj.greeting = 'Hi there';  
obj.greeting = 123;  

 
getData();
