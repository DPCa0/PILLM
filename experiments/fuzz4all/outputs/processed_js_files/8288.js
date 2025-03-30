 
async function* fetchData(ids) {
  for (const id of ids) {
    yield new Promise(resolve => setTimeout(() => resolve({ id, value: Math.random() }), 1000));
  }
}

 
async function processData(ids) {
  const results = [];

   
  for await (const data of fetchData(ids)) {
    const processed = { ...data, timestamp: new Date().toISOString() };
    print(`Fetched data for ID ${data.id}:`, processed);
    results.push(processed);
  }
  
  return results;
}

 
const ids = [1, 2, 3, 4, 5];
processData(ids).then(results => {
  const handler = {
    get(target, prop) {
      print(`Accessing property "${prop}"`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Setting property "${prop}" to ${JSON.stringify(value)}`);
      target[prop] = value;
      return true;
    }
  };
  const proxyResults = new Proxy(results, handler);

   
  print(proxyResults.length);
  proxyResults.push({ id: 6, value: Math.random(), timestamp: new Date().toISOString() });
  print(proxyResults[5]);
});
