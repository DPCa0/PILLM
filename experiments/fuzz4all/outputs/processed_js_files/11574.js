 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ id: 1, name: "Sample Data" });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return property in target ? target[property] : `Property '${property}' not found`;
  },
};

 
const main = async () => {
  try {
    const data = await fetchData("https://api.example.com/data");
    const proxiedData = new Proxy(data, handler);

     
    print(`Data ID: ${proxiedData.id}`);
    print(`Data Name: ${proxiedData.name}`);
    print(proxiedData.nonexistentProperty);  
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
main();
