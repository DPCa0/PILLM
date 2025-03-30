 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
const logHandler = {
  get(target, prop) {
    print(`Accessed property ${String(prop)}`);
    return Reflect.get(target, prop);
  }
};

 
function* dataProcessor(data) {
  for (const item of data) {
    yield `Processed: ${JSON.stringify(item)}`;
  }
}

 
(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
  const proxiedData = new Proxy(data, logHandler);

   
  const results = await Promise.all([...dataProcessor(proxiedData)].map(async (item) => {
    print(item);
    return item;
  }));

  print("All items processed:", results);
})();
