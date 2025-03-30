 

 
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

 
async function asyncFunction(url) {
  try {
    const data = await fetchData(url);
    print(data);
  } catch (error) {
    console.error(error);
  }
}

 
function* urlGenerator() {
  yield 'https://api.example.com/data1';
  yield 'https://api.example.com/data2';
  yield 'https://api.example.com/data3';
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' has been accessed`);
    return Reflect.get(...arguments);
  }
};

const proxyObject = new Proxy({ a: 1, b: 2 }, handler);
print(proxyObject.a);  

 
const urls = urlGenerator();

(async function processUrls() {
  for (let url of urls) {
    await asyncFunction(url);
  }
})();
