 

 
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { value: 42 }, meta: { timestamp: Date.now() } });
    }, 1000);
  });
}

 
function* processData(data) {
  yield `Original Value: ${data.value}`;
  yield `Doubled Value: ${data.value * 2}`;
  yield `Timestamp: ${new Date(data.timestamp).toLocaleString()}`;
}

 
const loggingHandler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing property '${property}': ${target[property]}`);
      return target[property];
    }
    print(`Property '${property}' not found`);
    return undefined;
  }
};

 
async function main() {
  print("Fetching data...");
  const response = await fetchData();

   
  const proxyData = new Proxy(response.data, loggingHandler);

   
  const processor = processData(proxyData);
  for (let step of processor) {
    print(step);
  }
}

 
main();
