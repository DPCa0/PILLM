 
 

async function fetchData(url) {
   
  const response = await fetch(url);
  return response.json();
}

function* dataGenerator(urls) {
   
  for (let url of urls) {
    yield fetchData(url);
  }
}

async function processAllData(urls) {
   
  const generator = dataGenerator(urls);
  const promises = Array.from(generator);

  const data = await Promise.all(promises);
  return data;
}

const dataHandler = {
  get: function (target, prop, receiver) {
     
    print(`Property "${prop}" accessed`);
    return Reflect.get(target, prop, receiver);
  }
};

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  const data = await processAllData(urls);

   
  const proxiedData = new Proxy(data, dataHandler);

   
  print(proxiedData[0]);
  print(proxiedData[1]);
  print(proxiedData[2]);
})();
