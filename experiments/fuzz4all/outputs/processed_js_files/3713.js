 

 
function* fetchData() {
  yield new Promise(resolve => setTimeout(() => resolve("Data Part 1"), 1000));
  yield new Promise(resolve => setTimeout(() => resolve("Data Part 2"), 1000));
}

 
async function getData() {
  let data = [];
  const generator = fetchData();
  for (let promise of generator) {
    data.push(await promise);
  }
  return data;
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Property ${String(prop)} accessed:`, Reflect.get(target, prop, receiver));
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property ${String(prop)} does not exist`);
      return undefined;
    }
  }
};

 
const config = new Proxy({ theme: 'dark', version: '1.0' }, handler);

 
async function processConfigAndData() {
  print("Processing configuration...");
  print(`Current theme: ${config.theme}`);
  print(`App version: ${config.version}`);

  print("Fetching data asynchronously...");
  const data = await getData();
  print("Data retrieved:", data);
  
   
  print(`Non-existent property: ${config.nonExistent}`);
}

processConfigAndData();
