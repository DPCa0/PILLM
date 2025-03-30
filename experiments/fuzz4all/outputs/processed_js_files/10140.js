 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: "Hello from the future!",
        timestamp: Date.now()
      });
    }, 1000);
  });
};

 
const dataHandler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      return `Property ${prop} not found`;
    }
  }
};

 
async function main() {
  try {
    print("Fetching data...");
    const data = await fetchData();

     
    const proxiedData = new Proxy(data, dataHandler);

     
    print(`Data: ${proxiedData.data}`);
     
    print(`Non-existing Property: ${proxiedData.nonExistingProperty}`);

     
    const dynamicProperty = 'timestamp';
    print(`Dynamic Property [${dynamicProperty}]: ${proxiedData[dynamicProperty]}`);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
main();
