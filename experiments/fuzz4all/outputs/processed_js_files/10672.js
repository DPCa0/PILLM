 

const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Sample data" });
      } else {
        reject("Error: Invalid URL");
      }
    }, 1000);
  });
};

const cache = new Map();

const handler = {
  get: function(target, prop) {
    if (prop === 'fetch') {
      return async (url) => {
        if (cache.has(url)) {
          return cache.get(url);
        } else {
          try {
            const result = await target[prop](url);
            cache.set(url, result);
            return result;
          } catch (error) {
            console.error(error);
          }
        }
      };
    }
    return target[prop];
  }
};

const api = new Proxy({ fetch: fetchData }, handler);

const main = async () => {
  try {
    const url = "https://api.example.com/data";
    const result1 = await api.fetch(url);
    print("First call result:", result1);

    const result2 = await api.fetch(url);
    print("Second call (from cache) result:", result2);
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

main();
