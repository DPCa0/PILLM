 
const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject(new Error("URL not provided"));
      }
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return property in target ? target[property] : `Property "${property}" not found`;
  },
  set: (target, property, value) => {
    print(`Setting property "${property}" to ${value}`);
    target[property] = value;
    return true;
  }
};

const targetData = {};
const proxyData = new Proxy(targetData, handler);

 
function* dataGenerator() {
  yield "Data 1";
  yield "Data 2";
  yield "Data 3";
}

 
const [first, ...rest] = [...dataGenerator()];

 
(async () => {
  try {
    const dataUrl = "https://api.example.com/data";
    const response = await fetchData(dataUrl);
    proxyData.fetchedData = response.data;

    print(`First: ${first}, Rest: ${rest}`);
    print(`Fetched Data: ${proxyData.fetchedData}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
