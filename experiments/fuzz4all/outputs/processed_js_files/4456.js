 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: "Fetched data from " + url });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
}

 
function* urlGenerator(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
async function handleUrls(urls) {
  const gen = urlGenerator(urls);
  for (let promise of gen) {
    try {
      const result = await promise;
      print(result.data);
    } catch (error) {
      console.error(error.message);
    }
  }
}

 
const urlLogger = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing URL: ${target[prop]}`);
      return target[prop];
    }
  },
  set: (target, prop, value) => {
    print(`Setting URL: ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const urls = ["https://example.com/api1", "https://example.com/api2"];

 
const proxiedUrls = new Proxy(urls, urlLogger);

 
proxiedUrls.push("https://example.com/api3");

 
handleUrls(proxiedUrls);
