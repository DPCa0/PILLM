 

 
async function fetchData(url) {
   
  await new Promise(resolve => setTimeout(resolve, 1000));

   
  return new Promise((resolve) => {
    resolve({
      data: { message: "Hello from the mock API!" },
      status: 200
    });
  });
}

 
function processData(data) {
   
  const handler = {
    get(target, prop, receiver) {
      print(`Getting property ${String(prop)}`);
      return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
      print(`Setting property ${String(prop)} to ${value}`);
      return Reflect.set(...arguments);
    }
  };

   
  const proxy = new Proxy(data, handler);
  print(proxy.message);  

  proxy.newProp = "This is a new property";  
  return proxy;
}

 
(async function* main() {
  try {
    print("Fetching data...");

     
    const response = await fetchData("https://mockapi.com/data");
    
     
    if (response.status === 200) {
      const processedData = processData(response.data);
      yield print("Processed data:", processedData);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
})().next();
