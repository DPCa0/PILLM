 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, Math.random() * 2000 + 1000);
  });
}

 
const urls = ['https://api.service1.com', 'https://api.service2.com', 'https://api.service3.com'];

 
const loggerHandler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return target[property];
    } else {
      console.warn(`Property ${property} does not exist on target`);
      return undefined;
    }
  },
};

 
async function fetchAllData() {
  const fetchPromises = urls.map((url) => fetchData(url));
  const responses = await Promise.all(fetchPromises);

   
  const [response1, ...otherResponses] = responses;
  print('First response:', response1);
  print('Other responses:', ...otherResponses);

   
  const responseProxy = new Proxy({ response1, otherResponses }, loggerHandler);

   
  print('Response1 via proxy:', responseProxy.response1);
  print('Accessing non-existent property:', responseProxy.nonExistent);

  return responseProxy;
}

 
fetchAllData().then((dataProxy) => {
  print('Finished fetching data via proxy:', dataProxy);
});
