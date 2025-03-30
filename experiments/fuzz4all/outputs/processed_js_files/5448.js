 

 
const fetchData = (url) => new Promise((resolve) =>
  setTimeout(() => resolve(`Data from ${url}`), 1000)
);

 
async function* dataFetcher(urls) {
  for (const url of urls) {
    yield await fetchData(url);
  }
}

 
const handler = {
  get(target, property) {
    print(`Getting ${property} value`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const proxyData = new Proxy({name: "Resource Manager"}, handler);
proxyData.name = "Data Processor";   
print(proxyData.name);         

 
const iterableObject = {
  [Symbol.iterator]: function* () {
    yield "Hello";
    yield "World";
  }
};

 
(async () => {
  const urls = ["https://api1.example.com", "https://api2.example.com"];
  
  print("\nFetching Data:");
  for await (const data of dataFetcher(urls)) {
    print(data);
  }

  print("\nIterating Custom Iterator:");
  for (const word of iterableObject) {
    print(word);
  }
})();
