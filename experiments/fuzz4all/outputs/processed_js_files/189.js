 

 
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });
}

 
function* dataGenerator(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
async function getData(urls) {
  const generator = dataGenerator(urls);
  let result = generator.next();
  while (!result.done) {
    print(await result.value);
    result = generator.next();
  }
}

 
const target = { x: 1, y: 2 };
const handler = {
  get: (obj, prop) => {
    print(`Property ${prop} accessed`);
    return prop in obj ? obj[prop] : undefined;
  },
};
const proxy = new Proxy(target, handler);

 
print(proxy.x);  
print(proxy.y);  
print(proxy.z);  

 
getData(['url1', 'url2', 'url3']);
