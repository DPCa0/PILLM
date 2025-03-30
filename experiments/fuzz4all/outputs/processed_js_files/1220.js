 
const fetchData = async ({ url, method = 'GET', headers = {} }) => {
  try {
     
    const response = await fetch(url, { method, headers });
    if (!response?.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
     
    const dataPromises = await Promise.all([
      response.json(),
      new Promise((resolve) => setTimeout(() => resolve('Additional Data'), 500))
    ]);

    return dataPromises.map(item => ({ item }));
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
  }
};

 
async function* dataGenerator() {
  const sources = [
    { url: 'https://api.example1.com/data' },
    { url: 'https://api.example2.com/data', method: 'POST', headers: { 'Content-Type': 'application/json' } }
  ];
  
  for (const source of sources) {
    const data = await fetchData(source);
    yield data;
  }
}

 
(async () => {
  for await (const data of dataGenerator()) {
    print('Fetched Data:', data);
  }
})();

 
const handler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

const monitoredObject = new Proxy({ key: 'value' }, handler);
print(monitoredObject.key);
