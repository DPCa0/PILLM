 
async function* fetchData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    if (!response.ok) continue;  
    const data = await response.json();
    yield* process(data);  
  }
}

 
function* process(data) {
  const processedData = new Set();
  data.map(item => ({
    id: item.id,
    name: item.name.toUpperCase()
  }))
  .forEach(item => processedData.add(item));

  yield* processedData;
}

 
const dataHandler = {
  get: (target, prop, receiver) => {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const proxy = new Proxy({}, dataHandler);
  for await (const item of fetchData(urls)) {
    proxy[item.id] = item;
  }

   
  print(proxy[1]);
})();
