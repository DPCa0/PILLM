 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
  print("Fetching data...");
  await delay(2000);  
  print("Data fetched!");
  return { data: "Sample Data", timestamp: Date.now() };
}

 
const handler = {
  get(target, property, receiver) {
    print(`Property '${property}' accessed`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Property '${property}' set to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
const uniqueKey = Symbol("uniqueKey");

 
const dataObject = {
  [uniqueKey]: "Sensitive Information",
  info: "General Data"
};

 
const proxiedDataObject = new Proxy(dataObject, handler);

 
async function main() {
  const data = await fetchData();
  proxiedDataObject.info = data.data;
  print(proxiedDataObject.info);
  print(proxiedDataObject[uniqueKey]);  
}

main().catch(console.error);
