 

 
const simulateAsyncOperation = (result, delay) => {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay));
};

 
const fetchData = async () => {
  try {
    let data = await simulateAsyncOperation({ name: "John", age: 30 }, 1000);
    print("Data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
const createDynamicObject = (initialData) => {
  return new Proxy(initialData, {
    get(target, property) {
      if (property in target) {
        print(`Getting ${property}`);
        return target[property];
      } else {
        console.warn(`Property ${property} does not exist`);
        return undefined;
      }
    },
    set(target, property, value) {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    },
  });
};

 
(async () => {
  const data = await fetchData();
  const dynamicObject = createDynamicObject(data);

  print(dynamicObject.name);  
  print(dynamicObject.gender);  

  dynamicObject.age = 31;  
  print(dynamicObject.age);
})();
