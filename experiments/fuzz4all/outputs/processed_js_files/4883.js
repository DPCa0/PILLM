 
async function fetchData(url) {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('No URL provided');
      }
    }, 1000);
  });
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed.`);
    return target[property];
  }
};

const targetObject = { name: "Sample", type: "Proxy" };
const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
  try {
     
    const ids = [...Array.from({ length: 5 }, () => idGenerator().next().value)];
    print("Generated IDs:", ids);

     
    const optionalAccess = targetObject?.description ?? "No description available";
    print("Optional Access Result:", optionalAccess);

     
    print(proxyObject.name);
    print(proxyObject.type);

     
    const result = await fetchData("https://api.example.com/data");
    print(result);
  } catch (error) {
    console.error("Error:", error);
  }
})();
