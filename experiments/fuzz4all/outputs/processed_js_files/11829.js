 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Example Data" });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
}

 
const dataHandler = {
  get(target, prop) {
    print(`Property '${prop}' was accessed`);
    return target[prop];
  }
};

const exampleData = {
  value: 42,
  text: "Hello, Proxy!"
};

const proxyData = new Proxy(exampleData, dataHandler);

 
function* dataGenerator() {
  try {
    const data = yield fetchData("https://api.example.com/data");
    yield data.data;
  } catch (error) {
    yield `Error: ${error.message}`;
  }
}

 
async function handleData() {
  const generator = dataGenerator();

   
  const { value: promise } = generator.next();
  try {
    const result = await promise;
    generator.next(result);

     
    print(proxyData.value);
    print(proxyData.text);

     
    const { value: finalData } = generator.next();
    print(`Final Data: ${finalData}`);
  } catch (error) {
    console.error(error);
  }
}

 
handleData();
