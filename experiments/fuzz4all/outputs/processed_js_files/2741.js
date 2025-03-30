 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
};

 
const loggingHandler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

 
(async () => {
  try {
    const url = "https://api.example.com/data";
    const response = await fetchData(url);
    
    const proxyData = new Proxy(response.data, loggingHandler);

     
    print(proxyData[2]);  
    proxyData[1] = 42;  

    const processedData = proxyData.map((num) => num * 2);
    print("Processed Data:", processedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
