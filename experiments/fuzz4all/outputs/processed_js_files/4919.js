 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

 
const processData = async (url) => {
  try {
    const data = await fetchData(url);
    const processedData = data.toUpperCase();
    print(`Processed: ${processedData}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

 
const uniqueSymbol = Symbol('unique');
const uniqueSet = new Set([1, 2, 3, uniqueSymbol]);

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
};

const originalObject = { name: 'JavaScript', type: 'Language' };
const proxyObject = new Proxy(originalObject, handler);

 
processData('https://api.example.com/data');
print(uniqueSet.has(uniqueSymbol));  
print(proxyObject.name);  

 
const config = { apiUrl: 'https://api.example.com', timeout: 5000 };
const { apiUrl, timeout = 3000 } = config;
print(`API URL: ${apiUrl}, Timeout: ${timeout}`);

 
function* dataGenerator() {
  yield 'Data 1';
  yield 'Data 2';
  yield 'Data 3';
}

const gen = dataGenerator();
for (const data of gen) {
  print(data);
}
