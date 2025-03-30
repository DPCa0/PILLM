 

 
const fetchData = (endpoint) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      endpoint === "/data"
        ? resolve({ data: [1, 2, 3, 4, 5] })
        : reject(new Error("Endpoint not found"));
    }, 1000);
  });
};

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing property '${property}':`, target[property]);
      return target[property];
    }
    console.error(`Property '${property}' not found on target.`);
    return undefined;
  },
};

 
async function main() {
  try {
    const response = await fetchData("/data");
    
     
    const proxiedData = new Proxy(response.data, handler);

     
    const iterator = dataGenerator(proxiedData);

    for (let value of iterator) {
      print("Processed value:", value);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
main();
