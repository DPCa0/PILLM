 

 
function* fetchDataGenerator(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

 
async function getData(urls) {
  const dataGenerator = fetchDataGenerator(urls);
  
  for await (const dataPromise of dataGenerator) {
    const data = await dataPromise;
    print(data);
  }
}

 
const target = { message: "Hello, Proxy World!" };
const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' accessed on target.`);
    return obj[prop];
  }
};

const proxy = new Proxy(target, handler);

 
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2"
];

 
getData(urls);

 
print(proxy.message);
