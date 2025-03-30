 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
  await delay(500);  
  if (!url) throw new Error("URL is required");
  print(`Fetching data from ${url}`);
  return { data: "Sample data from " + url };
}

 
function* dataGenerator(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessing property ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const dataProxy = new Proxy({ urls: [] }, handler);

 
async function main() {
  dataProxy.urls = ["https://api.example.com/data1", "https://api.example.com/data2"];

  const generator = dataGenerator(dataProxy.urls);

  for await (const promise of generator) {
    try {
      const result = await promise;
      print(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

 
main();
