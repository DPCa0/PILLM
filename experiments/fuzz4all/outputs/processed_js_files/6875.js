 

 
function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === "data") {
        resolve({ data: "Important Data" });
      } else {
        reject("Error: Endpoint not found");
      }
    }, 1000);
  });
}

 
const handler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property];
  }
};

 
async function getData() {
  try {
    const response = await fetchData("data");
    const dataProxy = new Proxy(response, handler);
    print(dataProxy.data);  
  } catch (error) {
    console.error(error);
  }
}

 
(async () => {
  await getData();
})();
