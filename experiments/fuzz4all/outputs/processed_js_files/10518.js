 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
const loggingHandler = {
  get(target, property) {
    print(`Getting property '${property}'`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

 
const data = new Proxy({ message: "Hello" }, loggingHandler);

 
async function* asyncGenerator() {
  for (let i = 0; i < 3; i++) {
    await delay(1000);
    yield `Value ${i}`;
  }
}

 
async function processAsyncGenerator() {
  print(data.message);

  data.message = "Updated Message";

   
  for await (const value of asyncGenerator()) {
    print(value);
  }

   
  const fetchData = () => Promise.resolve('Fetched Data');
  const result = await fetchData();
  print(result);
}

 
processAsyncGenerator().catch(console.error);
