 

 
function asyncOperation(data, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Processed: ${data}`), delay);
  });
}

 
async function processAsyncData(dataArray) {
  const results = [];
  for (const data of dataArray) {
    const result = await asyncOperation(data, 1000);
    results.push(result);
  }
  return results;
}

 
const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Get property '${prop}': ${obj[prop]}`);
      return obj[prop];
    }
    throw new ReferenceError(`Property '${prop}' does not exist.`);
  },
  set: (obj, prop, value) => {
    print(`Set property '${prop}' to ${value}`);
    obj[prop] = value;
    return true;
  }
};

 
const targetObject = { name: "JavaScript", version: "ES6" };

 
const proxiedObject = new Proxy(targetObject, handler);

 
function reflectUsage(obj, property) {
  if (Reflect.has(obj, property)) {
    print(`Property '${property}' exists in the object.`);
    print(`Value of '${property}': ${Reflect.get(obj, property)}`);
  } else {
    print(`Property '${property}' does not exist. Adding it now.`);
    Reflect.set(obj, property, "New Value");
  }
}

 
(async function main() {
  try {
    const dataToProcess = ["Task1", "Task2", "Task3"];
    print("Starting async data processing...");
    const processedData = await processAsyncData(dataToProcess);
    print("Processed Data:", processedData);
    
     
    print("Interacting with proxied object:");
    proxiedObject.name = "JavaScript Advanced";
    print(proxiedObject.name);
    try {
      print(proxiedObject.nonExistent);
    } catch (error) {
      console.error(error.message);
    }

     
    console.log