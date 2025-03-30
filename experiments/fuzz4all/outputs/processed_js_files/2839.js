 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return property in target ? target[property] : `Property ${property} not found`;
  },
};

 
async function processData(url) {
  try {
    const response = await fetchData(url);
    const dataProxy = new Proxy(response.data, handler);
    const [first, ...rest] = dataProxy;
    const doubled = rest.map((num) => num * 2);
    print(`First: ${first}, Doubled Rest: ${doubled}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
processData("https://api.example.com/data");
