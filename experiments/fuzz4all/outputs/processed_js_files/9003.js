 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
}

 
async function getData(url) {
  try {
    const data = await fetchData(url);
    print(data);
  } catch (error) {
    console.error(error);
  }
}

 
const handler = {
  get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} does not exist`),
};

const targetObject = {
  name: 'JavaScript',
  version: 'ES2023',
};

const proxy = new Proxy(targetObject, handler);
print(proxy.name);  
print(proxy.description);  

 
const urls = new Set();

function addUrl(url) {
  if (urls.has(url)) {
    print(`URL ${url} already exists.`);
  } else {
    urls.add(url);
    print(`URL ${url} added.`);
  }
}

addUrl('https://api.example.com/data1');
addUrl('https://api.example.com/data2');
addUrl('https://api.example.com/data1');  

 
urls.forEach((url) => getData(url));
