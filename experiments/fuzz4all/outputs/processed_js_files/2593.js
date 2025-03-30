 
async function* fetchData(urls) {
  const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
  for await (const data of fetchPromises) {
    yield data;
  }
}

 
const deepClone = obj => structuredClone(obj);

 
async function processData(urls) {
  try {
     
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

     
    const dataIterator = fetchData(urls, { signal: controller.signal });
    const results = [];
    for await (const data of dataIterator) {
      results.push(deepClone(data));  
    }
    clearTimeout(timeoutId);

     
    const handler = {
      get(target, prop) {
        if (prop === 'summary') {
          return target.map(d => d.summary);
        }
        return Reflect.get(target, prop);
      }
    };

    const proxiedResults = new Proxy(results, handler);
    print(proxiedResults.summary);  

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
];
processData(urls);
