 

 
const targetObject = { secret: "hidden message", exposed: "public info" };
const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' has been accessed.`);
    return prop in obj ? obj[prop] : "Property does not exist.";
  }
};
const proxy = new Proxy(targetObject, handler);

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve("Data fetched!") : reject("Fetch failed.");
    }, 1000);
  });
};

 
function* asyncGenerator() {
  yield fetchData();
  yield fetchData();
}

 
const processGenerator = async () => {
  const generator = asyncGenerator();
  for await (let promiseResult of generator) {
    try {
      print(await promiseResult);
    } catch (error) {
      print(error);
    }
  }
};

 
(async () => {
  print(proxy.secret);
  await processGenerator();
  print(proxy.exposed);
})();
