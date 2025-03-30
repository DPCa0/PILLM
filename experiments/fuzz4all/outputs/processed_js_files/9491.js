 

 
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

 
async function getUserData() {
  try {
    const data = await fetchData('https://api.example.com/data');
    print('Data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const userProxyHandler = {
  get: (target, property) => {
    if (property in target) {
      print(`Property ${property} accessed`);
      return target[property];
    } else {
      console.warn(`Property ${property} does not exist on target`);
      return undefined;
    }
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

async function main() {
  const userData = await getUserData();
  
  if (userData) {
    const userProxy = new Proxy(userData, userProxyHandler);
    print('User Name:', userProxy.name);  
    userProxy.age = 31;  
    print('Updated User Data:', userProxy);
  }
}

main();
