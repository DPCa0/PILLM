 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve("Data fetched successfully!") : reject("Failed to fetch data.");
    }, 1000);
  });
};

 
async function fetchAndLogData() {
  try {
    const data = await fetchData();
    print(data);
  } catch (error) {
    console.error(error);
  }
}

 
const handler = {
  get: (target, prop) => {
    return prop in target ? target[prop] : `Property "${prop}" does not exist.`;
  },
  set: (target, prop, value) => {
    if (typeof value === 'number') {
      target[prop] = value;
      print(`Property "${prop}" set to ${value}.`);
    } else {
      console.warn(`Invalid value type for property "${prop}". Must be a number.`);
    }
  }
};

const targetObj = { a: 1, b: 2 };
const proxy = new Proxy(targetObj, handler);

 
Reflect.defineProperty(proxy, 'c', {
  value: 3,
  writable: true,
  enumerable: true,
  configurable: true
});

print(proxy.a);  
print(proxy.b);  
print(proxy.c);  

proxy.a = 10;  
proxy.b = 'string';  
print(proxy.x);  

 
fetchAndLogData();
