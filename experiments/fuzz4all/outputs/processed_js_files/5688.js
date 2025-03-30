 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, 1000);
  });
};

 
function* dataFetcher(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
const handleData = async (urls) => {
  const generator = dataFetcher(urls);
  for await (const { data } of generator) {
    print(data);
  }
};

 
const logHandler = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

 
const targetObject = { message: "Hello, Proxy!" };
const proxyObject = new Proxy(targetObject, logHandler);

 
const dynamicImportFunction = async () => {
  if (Math.random() > 0.5) {
    const { upperCase } = await import("lodash");
    print(upperCase("Dynamic Import Successful"));
  } else {
    print("Skipped Import");
  }
};

 
(async () => {
  const urls = ["https://api.example.com/data1", "https://api.example.com/data2"];
  
   
  await handleData(urls);

   
  print(proxyObject.message);
  proxyObject.message = "Updated message through Proxy";

   
  await dynamicImportFunction();
})();
