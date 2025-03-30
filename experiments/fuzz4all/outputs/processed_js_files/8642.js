 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Sample Data" });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
};

 
const processData = async (url) => {
  try {
    const response = await fetchData(url);
    const uniqueData = new Set([...response.data]);  
    return [...uniqueData].join(", ");
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};

 
const logHandler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === "function") {
      return function (...args) {
        print(`Called ${prop} with args: ${JSON.stringify(args)}`);
        return Reflect.apply(target[prop], receiver, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
};

 
const dataMap = new Map();
const proxiedDataMap = new Proxy(dataMap, logHandler);

 
const main = async () => {
  const url = "https://api.example.com/data";
  const processed = await processData(url);
  if (processed) {
    proxiedDataMap.set(url, processed);
  }

  print(`Stored processed data for ${url}: ${proxiedDataMap.get(url)}`);
};

main();
