 

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
function delayedValue(value, timeout) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), timeout);
  });
}

 
async function fetchData(idGen) {
  while (true) {
    const id = idGen.next().value;
    const data = await delayedValue(`Data for ID: ${id}`, Math.random() * 2000);
    print(data);
    if (id >= 5) break;  
  }
}

 
const handler = {
  get: function (target, property, receiver) {
    if (property in target) {
      print(`Accessed property: ${property}`);
      return Reflect.get(target, property, receiver);
    } else {
      print(`Attempted to access missing property: ${property}`);
      return undefined;
    }
  },
};

const dataObject = {
  info: "Sample data",
  value: 42,
};

const proxiedDataObject = new Proxy(dataObject, handler);

 
(async function main() {
  print("Fetching data...");
  const idGen = idGenerator();
  await fetchData(idGen);
  print("Data fetch complete.");

   
  print(`Info: ${proxiedDataObject.info}`);
  print(`Missing: ${proxiedDataObject.missing}`);
  print(`Value: ${proxiedDataObject.value}`);
})();
