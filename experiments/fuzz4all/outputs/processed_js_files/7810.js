 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      print(`Getting the ${property} property`);
      return Reflect.get(target, property, receiver);
    } else {
      return `Property ${property} does not exist`;
    }
  },
  set(target, property, value, receiver) {
    print(`Setting the ${property} property to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

const targetObject = {
  name: "JavaScript",
  type: "Programming Language"
};

const proxy = new Proxy(targetObject, handler);

 
print(proxy.name);  
proxy.version = "ES6";    
print(proxy.version);  
print(proxy.level);  

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { data: 'some data from ' + url };
      resolve(data);
    }, 1000);
  });
};

async function complexAsyncProcess() {
  try {
    print('Fetching data...');
    const data1 = await fetchData('https://api.example.com/data1');
    print('Received:', data1);
    const data2 = await fetchData('https://api.example.com/data2');
    print('Received:', data2);
    const combinedData = { ...data1, ...data2 };
    print('Combined Data:', combinedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

complexAsyncProcess();
