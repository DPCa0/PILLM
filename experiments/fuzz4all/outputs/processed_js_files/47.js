 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Fetched Data");
    }, 1000);
  });
};

 
const createEnhancedObject = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      if (prop in obj) {
        print(`Accessed property '${prop}':`, Reflect.get(obj, prop));
        return Reflect.get(obj, prop);
      } else {
        console.warn(`Property '${prop}' does not exist.`);
        return undefined;
      }
    },
    set: (obj, prop, value) => {
      print(`Setting property '${prop}' to '${value}'`);
      Reflect.set(obj, prop, value);
      return true;
    },
  });
};

 
const processAsyncData = async () => {
  print("Fetching data...");
  const data = await fetchData();
  print("Data received:", data);

  const obj = { name: "Alice", age: 30 };
  const enhancedObj = createEnhancedObject(obj);

  enhancedObj.name;  
  enhancedObj.age = 31;  
  enhancedObj.gender;  
};

 
processAsyncData();
