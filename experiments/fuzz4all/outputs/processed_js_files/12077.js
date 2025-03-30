 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, Math.random() * 2000);
  });
};

 
async function* fetchFromUrls(urls) {
  for (let url of urls) {
    yield await fetchData(url);
  }
}

 
const loggingHandler = {
  get(target, prop, receiver) {
    print(`Accessing property ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

 
const urls = ["https://api.example.com/1", "https://api.example.com/2", "https://api.example.com/3"];

 
(async () => {
  const urlProxy = new Proxy(urls, loggingHandler);
  const urlData = fetchFromUrls(urlProxy);

  for await (let data of urlData) {
    print(data);
  }
})();
