 

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "Fetched Data", timestamp: Date.now() });
    }, 2000);
  });
};

const processSymbol = Symbol("process");

const processData = {
  [processSymbol]: (data) => {
    print(`Processing: ${data}`);
    return `Processed: ${data.toUpperCase()}`;
  },
};

const dataHandler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === "function") {
      return function (...args) {
        print(`Called ${prop.toString()} with`, args);
        return Reflect.apply(target[prop], target, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
};

const processProxy = new Proxy(processData, dataHandler);

const main = async () => {
  print("Starting data fetch...");
  const rawData = await fetchData();
  print("Data fetched:", rawData);

  const result = processProxy[processSymbol](rawData.data);
  print("Result:", result);
};

main();
