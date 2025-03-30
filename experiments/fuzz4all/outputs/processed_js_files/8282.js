 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Sample Data", status: 200 });
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, 1000);
  });
}

 
const handler = {
  get(target, property, receiver) {
    print(`Accessing property: ${property}`);
    return Reflect.get(target, property, receiver);
  }
};

const dataProxy = new Proxy({ key: "value" }, handler);

 
async function getDataAndManipulate() {
  try {
    const response = await fetchData("https://api.example.com/data");
    print(`Fetched Data: ${response.data}, Status: ${response.status}`);
    
     
    print(`Data Proxy Key: ${dataProxy.key}`);
    
     
    const processedData = processResponse(response.data);
    print(`Processed Data: ${processedData}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

 
function processResponse(data) {
   
  const { length } = data;
  return `Data Length: ${length}, Uppercased: ${data.toUpperCase()}`;
}

 
getDataAndManipulate();
