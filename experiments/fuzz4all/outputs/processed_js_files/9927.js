 
const fs = require('fs');
const path = require('path');

 
const logger = {
  get(target, prop) {
    print(`Accessing property: ${prop}`);
    return target[prop];
  }
};

 
const user = new Proxy({
  name: 'Alice',
  age: 30,
  location: 'Wonderland'
}, logger);

 
print(user.name);

 
const readFileAsync = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    print(data);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
};

 
const filePath = path.resolve(__dirname, 'sample.txt');

 
(async () => {
  await readFileAsync(filePath);
})();

 
const dataMap = new Map();
const dataSet = new Set([1, 2, 3, 4, 5]);

dataSet.forEach(value => {
   
  dataMap.set(value, value * value);
});

 
for (const [key, value] of dataMap) {
  print(`Key: ${key}, Value: ${value}`);
}

 
const fetchData = async (url) => {
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Fetched data from ${url}`), 1000);
  });
  return response;
};

 
const urls = ['http://api.example.com/data1', 'http://api.example.com/data2'];

 
Promise.all(urls.map(fetchData)).then((responses) => {
  responses.forEach(response => print(response));
});
