 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, Math.random() * 2000);
  });
};

 
function* apiCalls() {
  yield 'https://api.example.com/data1';
  yield 'https://api.example.com/data2';
  yield 'https://api.example.com/data3';
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessed property ${prop}:`, target[prop]);
      return target[prop];
    } else {
      throw new ReferenceError(`Property ${prop} does not exist.`);
    }
  },
};

 
const main = async () => {
  const urls = apiCalls();
  const responses = [];

  for (let url of urls) {
    const data = await fetchData(url);
    responses.push(data);
  }

   
  const proxyResponses = new Proxy(responses, handler);

   
  print(proxyResponses[0]);  
  try {
    print(proxyResponses[3]);  
  } catch (error) {
    console.error(error.message);
  }
};

main();
