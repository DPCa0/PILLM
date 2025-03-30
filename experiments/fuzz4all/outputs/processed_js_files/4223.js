 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: "Hello, Advanced World!" }), 1000);
  });
}

 
const uniqueProp = Symbol("unique");

const dataHandler = {
  get: (target, prop, receiver) => {
    if (prop === uniqueProp) {
      return "You found the unique property!";
    }
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    if (prop === "data" && typeof value !== "string") {
      throw new TypeError("Data should be a string");
    }
    return Reflect.set(target, prop, value);
  },
};

 
const dataProxy = new Proxy({}, dataHandler);

async function processData() {
  try {
    const fetchedData = await fetchData();
    dataProxy.data = fetchedData.data;  
    print(dataProxy.data);  
    print(dataProxy[uniqueProp]);  
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

processData();
