 

 
const fetchData = (url) => new Promise((resolve) => {
  setTimeout(() => resolve(`Data from ${url}`), 1000);
});

 
async function fetchMultipleData(urls) {
  const fetchPromises = urls.map((url) => fetchData(url));
  const data = await Promise.all(fetchPromises);
  return data;
}

 
const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      return `Property "${prop}" is not available.`;
    }
  },
  set: (obj, prop, value) => {
    if (typeof value === 'string') {
      obj[prop] = value.toUpperCase();
    } else {
      throw new Error('Only string values are allowed.');
    }
  }
};

const dataStore = new Proxy({}, handler);

 
const uniqueKey = Symbol('uniqueKey');
dataStore[uniqueKey] = 'This is a unique key';

 
(async function main() {
  const urls = ['http://api.example.com/data1', 'http://api.example.com/data2'];
  const data = await fetchMultipleData(urls);

   
  const [data1, data2] = data;
  
  print(data1);
  print(data2);

   
  dataStore.name = 'John Doe';
  print(dataStore.name);   

  print(dataStore.nonExistentProperty);  
  print(dataStore[uniqueKey]);  
})();
