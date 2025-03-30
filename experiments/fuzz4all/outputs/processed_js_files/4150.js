 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
function* dataGenerator(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
const loggerHandler = {
  get: function(target, prop) {
    print(`Accessing property "${prop}"`);
    return prop in target ? target[prop] : 'Property does not exist';
  }
};

let logger = new Proxy({}, loggerHandler);

 
const urls = ['https://api.example1.com', 'https://api.example2.com'];

 
(async () => {
  const generator = dataGenerator(urls);
  
  for (let promise of generator) {
    const data = await promise;
    print(data);
  }
  
  logger.exampleProperty = 'This is an example';
  print(logger.exampleProperty);  
  print(logger.nonExistentProperty);  
})();
