 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const processData = async (...urls) => {
  let results = await Promise.all(urls.map(url => fetchData(url)));
  let [first, ...rest] = results;

  return {
    first,
    rest
  };
};

const apiProxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    console.warn(`Property ${prop} does not exist.`);
    return null;
  }
};

const apiUrls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2"
];

const main = async () => {
  const proxyApiUrls = new Proxy(apiUrls, apiProxyHandler);
  const { first, rest } = await processData(...proxyApiUrls);

  print("First fetched data:", first);
  print("Remaining data:", rest);
};

main();
