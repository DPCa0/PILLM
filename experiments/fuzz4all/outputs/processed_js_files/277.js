 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://valid.url") {
        resolve({ data: "Fetched Data" });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
};

const apiHandler = {
  get: async (target, prop) => {
    if (prop === "fetch") {
      return await fetchData(target.url).catch(e => `Error: ${e.message}`);
    }
    return Reflect.get(target, prop);
  }
};

function* createIdGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGenerator = createIdGenerator();

const uniqueSet = new Set();

const apiProxy = new Proxy({ url: "https://valid.url" }, apiHandler);

(async () => {
  print(`Generated ID: ${idGenerator.next().value}`);

  try {
    const result = await apiProxy.fetch;
    print(`API Response: ${result}`);
    uniqueSet.add(result);
  } catch (error) {
    print(error);
  }

  print(`Generated ID: ${idGenerator.next().value}`);

  apiProxy.url = "https://invalid.url";
  try {
    const result = await apiProxy.fetch;
    print(`API Response: ${result}`);
  } catch (error) {
    print(error);
  }

  print(`Unique Set Content: ${[...uniqueSet]}`);
})();
