 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });
};

 
const handler = {
  get: (obj, prop) => {
    print(`Property ${prop} was accessed.`);
    return prop in obj ? obj[prop] : `No such property: ${prop}`;
  }
};

const target = {
  name: 'Proxy Object',
  age: 30
};

const proxy = new Proxy(target, handler);

 
(async () => {
  const { name, age } = proxy;
  print(`Name: ${name}, Age: ${age}`);
  
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  
   
  const results = await Promise.all(urls.map(url => fetchData(url)));
  
   
  results.forEach((result, index) => {
    print(result?.toUpperCase() ?? `No result from URL index: ${index}`);
  });
})();
