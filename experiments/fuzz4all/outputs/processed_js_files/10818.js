 

const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ id: 1, name: "John Doe" });
      } else {
        reject("Error: Invalid URL");
      }
    }, 1000);
  });
};

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      throw new ReferenceError(`Property "${prop}" does not exist.`);
    }
  },
};

(async () => {
  try {
    print("Fetching data...");
    const response = await fetchData("https://api.example.com/data");
    
    const proxyResponse = new Proxy(response, handler);

    print(`Hello, ${proxyResponse.name}! Your ID is ${proxyResponse.id}.`);

     
    print(proxyResponse.age);
  } catch (error) {
    console.error(error);
  }
})();
