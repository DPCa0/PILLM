 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      url ? resolve(`Data from ${url}`) : reject("URL not provided");
    }, 1000);
  });
}

 
function* dataGenerator(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
async function fetchAllData(generator) {
  for (const promise of generator) {
    try {
      const data = await promise;
      print(data);
    } catch (error) {
      console.error(error);
    }
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

const data = { firstName: "John", lastName: "Doe" };
const proxyData = new Proxy(data, handler);

 
print(proxyData.firstName);
proxyData.lastName = "Smith";

 
const urls = ["https://api.example.com/data1", "https://api.example.com/data2"];
const generator = dataGenerator(urls);

 
fetchAllData(generator);
