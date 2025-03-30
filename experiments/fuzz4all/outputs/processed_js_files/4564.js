 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Fetched data from ${url}`);
      } else {
        reject('No URL provided');
      }
    }, 1000);
  });
}

 
function* dataGenerator(dataArray) {
  for (const data of dataArray) {
    yield fetchData(data);
  }
}

 
const handler = {
  get: function(target, prop) {
    return prop in target ? target[prop] : `Property ${prop} does not exist`;
  }
};

const targetObject = {
  apiEndpoint: 'https://api.example.com/data',
  apiVersion: 'v1.0'
};

const proxy = new Proxy(targetObject, handler);

(async function() {
  try {
    print(proxy.apiEndpoint);  
    print(proxy.nonExistentProp);  
    
    const generator = dataGenerator([proxy.apiEndpoint, proxy.apiEndpoint + '/more']);
    
    for await (const dataPromise of generator) {
      print(await dataPromise);  
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
