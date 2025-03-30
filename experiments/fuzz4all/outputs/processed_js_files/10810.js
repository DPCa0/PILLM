 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
}

 
async function processData(url) {
  try {
    print("Fetching data...");
    const response = await fetchData(url);
    print("Data received:", response.data);

     
    function* processItems(items) {
      for (let item of items) {
        yield item * 2;
      }
    }

     
    const iterator = processItems(response.data);
    let result = iterator.next();

    while (!result.done) {
      print("Processed item:", result.value);
      result = iterator.next();
    }
  } catch (error) {
    console.error(error);
  }
}

 
const dataHandler = {
  get(target, prop, receiver) {
    print(`Getting ${prop} value`);
    return Reflect.get(target, prop, receiver);
  },
};

const proxy = new Proxy({ name: "Advanced JS", version: "ES2023" }, dataHandler);

 
print(proxy.name);
print(proxy.version);

 
processData("https://api.example.com/data");
