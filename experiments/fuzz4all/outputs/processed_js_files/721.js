 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com") {
        resolve({ data: { message: "Hello from example.com" } });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
};

 
function* dataGenerator(dataArray) {
  for (const data of dataArray) {
    yield data;
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' has been accessed.`);
    return Reflect.get(...arguments);
  }
};

const targetObject = { message: "Hello, world!", status: 200 };
const proxy = new Proxy(targetObject, handler);

 
(async () => {
  try {
    const response = await fetchData("https://example.com");
    print(response.data.message);  

    const dataArray = [{ name: "John" }, { name: "Jane" }, { name: "Doe" }];
    const gen = dataGenerator(dataArray);
    
    print(gen.next().value);  
    print(gen.next().value);  
    print(gen.next().value);  
    
    print(proxy.message);  
  } catch (error) {
    console.error(error.message);
  }
})();
