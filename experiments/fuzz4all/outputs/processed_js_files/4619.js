 
const fetchData = (url) => {
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

 
async function processData() {
  try {
     
    const { data: [first, ...rest] } = await fetchData("https://api.example.com/data");

     
    const mappedData = rest.map(x => x * 2);
    const uniqueSet = new Set(mappedData);

     
    const handler = {
      get: (target, property) => {
        return property in target ? target[property] : `Property ${property} does not exist`;
      }
    };
    
    const proxy = new Proxy({ uniqueSet }, handler);
    
    print(`First element: ${first}`);
    print(`Transformed data with unique values:`, [...proxy.uniqueSet]);

     
    print(`First transformed element: ${mappedData?.[0] ?? "No data"}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

 
processData();
