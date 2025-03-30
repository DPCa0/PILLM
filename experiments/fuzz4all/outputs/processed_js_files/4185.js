 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
};

 
const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Accessing property '${prop}' with value: ${obj[prop]}`);
      return obj[prop];
    } else {
      print(`Property '${prop}' not found.`);
      return undefined;
    }
  },
};

 
const main = async () => {
  try {
    const response = await fetchData("https://api.example.com/data");
    const dataProxy = new Proxy(response, handler);

     
    print("Data:", dataProxy.data);
    print("Non-existing property:", dataProxy.nonExistingProp);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
main();
