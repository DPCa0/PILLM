 
const fetchData = url =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: { message: "Hello from API" } });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });

const cache = new Map();
const handler = {
  get(target, prop) {
    if (prop === "data" && cache.has(target.url)) {
      print("Returning cached data...");
      return cache.get(target.url);
    }
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    if (prop === "data") {
      cache.set(target.url, value);
      print("Data cached...");
    }
    return Reflect.set(...arguments);
  }
};

class DataFetcher {
  constructor(url) {
    this.url = url;
    this.data = null;
  }

  async fetch() {
    try {
      this.data = await fetchData(this.url);
    } catch (error) {
      console.error(error.message);
    }
  }
}

(async function main() {
  const url = "https://api.example.com/data";
  const fetcher = new DataFetcher(url);
  const proxiedFetcher = new Proxy(fetcher, handler);

  await proxiedFetcher.fetch();
  print(proxiedFetcher.data);  

  await proxiedFetcher.fetch();
  print(proxiedFetcher.data);  
})();
