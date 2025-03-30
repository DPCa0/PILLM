 

 

const fetchData = url => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = { data: "Hello, World!" };  
      url ? resolve(mockData) : reject(new Error('URL not provided'));
    }, 1000);
  });
};

const processData = data => {
  return data.toUpperCase();
};

(async () => {
  try {
    const apiUrl = 'https://api.mockservice.com/data';
    const data = await fetchData(apiUrl).then(response => response.data);
    const result = [data].map(processData).reduce((acc, val) => `${acc} - Processed: ${val}`);
    print(result);
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
})();

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Accessed property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  }
};

const targetObject = { message: 'Hello, Proxy!' };
const proxy = new Proxy(targetObject, handler);

print(proxy.message);  
