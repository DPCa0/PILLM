 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
function* dataFlow(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
async function handleDataFlow(generator) {
  const iterator = generator();
  let result = iterator.next();

  while (!result.done) {
    const data = await result.value;
    print(data);
    result = iterator.next();
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    return `Property ${prop} not found`;
  },
};

 
const sampleObj = {
  firstName: "John",
  lastName: "Doe",
};

 
const proxiedSample = new Proxy(sampleObj, handler);

 
(async () => {
   
  const urls = ["http://api.example.com/data1", "http://api.example.com/data2"];

  print("Fetching data...");

   
  await handleDataFlow(function* () {
    yield* dataFlow(urls);
  });

  print("Data fetching completed!");

   
  print(proxiedSample.firstName);  
  print(proxiedSample.age);  
})();
