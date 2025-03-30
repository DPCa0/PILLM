 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Sample data from API" });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
}

 
async function* asyncDataFetcher(urls) {
  for (const url of urls) {
    try {
      const response = await fetchData(url);
      yield response.data;
    } catch (error) {
      yield error;
    }
  }
}

 
const urlHandler = {
  get: (target, prop) => {
    if (target.includes(prop)) {
      return prop;
    } else {
      throw new Error(`URL ${prop} is not allowed`);
    }
  }
};

const allowedUrls = new Proxy(
  ["https://api.example.com/data", "https://api.example.com/other"],
  urlHandler
);

(async () => {
  const urlList = [
    allowedUrls["https://api.example.com/data"],
    allowedUrls["https://api.example.com/other"],
    "https://api.invalid.com/invalid"
  ];

  const dataFetcher = asyncDataFetcher(urlList);
  for await (const data of dataFetcher) {
    print(data);
  }
})();
