 

 
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
    print(`Property '${property}' accessed.`);
    return target[property];
  },
};

 
const processData = async (url) => {
  try {
    const response = await fetchData(url);
    
     
    const proxiedData = new Proxy(response.data, loggingHandler);
    
     
    const [first, second, ...rest] = proxiedData;

    print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
    
     
    const squared = proxiedData.map(num => num * num);
    print(`Squared data: ${squared}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

 
processData("https://api.example.com/data");
