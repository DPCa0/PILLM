 

 
const fetchData = async () => {
  return new Promise((resolve) => setTimeout(() => resolve("Data fetched!"), 1000));
};

 
const processData = async () => {
  print("Start processing...");

   
  const result = await fetchData();
  print(result);

  print("Processing complete!");
};

 
const createLoggingProxy = (obj) => {
  return new Proxy(obj, {
    get(target, property) {
      print(`Getting property '${property}'`);
      return Reflect.get(target, property);
    },
    set(target, property, value) {
      print(`Setting property '${property}' to '${value}'`);
      return Reflect.set(target, property, value);
    }
  });
};

 
const uniqueValues = new Set([1, 2, 3, 3, 4]);

 
const main = async () => {
  const data = createLoggingProxy({ name: "Alice", age: 30 });

   
  print(data.name);
  data.age = 31;

   
  uniqueValues.add(5);
  uniqueValues.add(6);

  print("Unique Values:", [...uniqueValues]);

   
  await processData();
};

 
main();
