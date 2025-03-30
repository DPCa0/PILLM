 

 
function* fetchData() {
  yield new Promise((resolve) => setTimeout(() => resolve(10), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve(20), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve(30), 1000));
}

 
async function processData() {
  const dataGenerator = fetchData();
  let total = 0;

  for await (let data of dataGenerator) {
    total += data;
    print(`Current total: ${total}`);
  }
  return total;
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting ${property}: ${target[property]}`);
      return target[property];
    }
    return `Property ${property} does not exist`;
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

 
const dataHandler = new Proxy({ sum: 0 }, handler);

 
async function main() {
  print("Starting data processing...");
  dataHandler.sum = await processData();
  print(`Final total from Proxy: ${dataHandler.sum}`);
}

 
main();
