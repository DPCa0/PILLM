 

 
const internal = Symbol('internal');

 
const loggingHandler = {
  get(target, property) {
    print(`Getting ${property}`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};

 
async function fetchData() {
  return new Promise((resolve) => setTimeout(() => resolve("Data from server"), 1000));
}

 
function* processData(data) {
  yield `Processing: ${data.toUpperCase()}`;
  yield `Reversing: ${data.split('').reverse().join('')}`;
}

 
const dataHandler = new Proxy({
  [internal]: {
    data: null
  },
  async updateData() {
    this[internal].data = await fetchData();
    print("Data updated");
  },
  *getDataProcessor() {
    yield* processData(this[internal].data || "No Data");
  }
}, loggingHandler);

(async function main() {
  print("Initial State");
  print([...dataHandler.getDataProcessor()]);

  print("\nUpdating Data...");
  await dataHandler.updateData();
  
  print("\nUpdated State");
  print([...dataHandler.getDataProcessor()]);
})();
