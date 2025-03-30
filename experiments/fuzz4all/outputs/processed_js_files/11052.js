 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Here is your data!" });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
}

 
function* dataGenerator() {
  try {
    const response = yield fetchData("https://api.example.com/data");
    return response.data;
  } catch (error) {
    return error;
  }
}

 
async function asyncGeneratorHandler(generator) {
  const iterator = generator();

  function handle(result) {
    if (result.done) return result.value;

     
    return Promise.resolve(result.value).then(
      res => handle(iterator.next(res)),
      err => handle(iterator.throw(err))
    );
  }

  return handle(iterator.next());
}

 
const dataHandler = {
  get: function(target, property) {
    print(`Accessing property '${property}'`);
    return property in target ? target[property] : `Property '${property}' does not exist`;
  }
};

 
async function main() {
  const result = await asyncGeneratorHandler(dataGenerator);
  print("Fetched result:", result);

  const data = { success: true, message: result };
  const proxiedData = new Proxy(data, dataHandler);

  print(proxiedData.success);
  print(proxiedData.message);
  print(proxiedData.nonExistentProperty);
}

main();
