 
async function* fetchData() {
  const dataChunks = [
    { id: 1, value: "First" },
    { id: 2, value: "Second" },
    { id: 3, value: "Third" },
  ];
  
  for (const chunk of dataChunks) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield chunk;
  }
}

 
const dataHandler = {
  get(target, prop) {
    if (prop in target) {
      return Reflect.get(target, prop);
    }
    return `Property ${prop} is not available!`;
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
(async function main() {
  const dataProxy = new Proxy({}, dataHandler);
  
  print("Starting data fetching...");
  for await (const chunk of fetchData()) {
    print("Fetched:", chunk);
    dataProxy[chunk.id] = chunk.value;
  }
  
  print("Fetching complete!");
  print("Accessing data through proxy:");
  print("Data 1:", dataProxy[1]);
  print("Data 2:", dataProxy[2]);
  print("Non-existent Data:", dataProxy[5]);
})();
