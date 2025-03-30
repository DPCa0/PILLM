 

 
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Alice', job: 'Engineer' });
    }, 1000);
  });
}

 
async function processData() {
  const data = await fetchData();
  print('Fetched Data:', data);

   
  const handler = {
    get(target, property) {
      print(`Accessing property '${property}'`);
      return target[property];
    },
    set(target, property, value) {
      print(`Setting property '${property}' to '${value}'`);
      target[property] = value;
      return true;
    }
  };

  const proxiedData = new Proxy(data, handler);

   
  Reflect.set(proxiedData, 'name', 'Bob');
  const job = Reflect.get(proxiedData, 'job');
  print('Updated Name:', proxiedData.name);
  print('Job:', job);
}

processData().catch(console.error);
