 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  }
};

 
function createProxiedObject() {
  const obj = { name: "Advanced JS", year: 2023 };
  return new Proxy(obj, handler);
}

 
async function processData() {
  const proxiedObj = createProxiedObject();

  print("Starting async processing...");
  
  await delay(1000);  
  print(`Project: ${proxiedObj.name}`);
  
  await delay(1000);  
  print(`Year: ${proxiedObj.year}`);

  print("Async processing completed.");
}

 
processData().catch(error => console.error(error));
