 

 
const fetchData = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Response from ${url}` });
    }, 1000);
  });
};

 
async function* apiCaller(urls) {
  for (let url of urls) {
    yield await fetchData(url);
  }
}

 
const loggingHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}' with value: ${target[prop]}`);
      return target[prop];
    } else {
      console.error(`Property '${prop}' not found`);
    }
  },
};

 
const dataObject = {
  user: "John Doe",
  age: 30,
  role: "developer",
};

 
const proxyDataObject = new Proxy(dataObject, loggingHandler);

 
(async () => {
  print("Starting API calls...\n");

  const urls = ["http://api.example.com/data1", "http://api.example.com/data2"];
  for await (const response of apiCaller(urls)) {
    print(response.data);
  }

  print("\nInteracting with Proxy:\n");
  print(proxyDataObject.user);
  print(proxyDataObject.age);
  print(proxyDataObject.nonExistentProperty);
})();
