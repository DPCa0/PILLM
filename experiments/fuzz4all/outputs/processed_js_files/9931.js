 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: [1, 2, 3, 4, 5, 5, 3, 2, 1] });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
};

 
const dataHandler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist!`);
      return undefined;
    }
  },
};

 
const processData = async () => {
  try {
    const response = await fetchData("https://api.example.com/data");
    const data = new Proxy(response.data, dataHandler);

     
    const uniqueData = new Set(data);
    print("Unique Data:", [...uniqueData]);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
processData();
