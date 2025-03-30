 

 
async function* fetchSequence(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    yield response.json();
  }
}

 
async function fetchAllData(urls) {
  const data = [];
  const generator = fetchSequence(urls);

  for await (const item of generator) {
    data.push(item);
  }
  return data;
}

 
const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}'`);
      return target[prop];
    }
    console.error(`Property '${prop}' not found`);
    return null;
  },
};

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
  ];
  
  try {
    const rawData = await fetchAllData(urls);
    
     
    const [{ title: firstTitle }, { title: secondTitle }] = rawData;
    print(`First Title: ${firstTitle}, Second Title: ${secondTitle}`);

     
    const dataProxy = new Proxy(rawData[0], dataHandler);
    print(`User ID: ${dataProxy.userId}`);
    print(`Non-existing Property: ${dataProxy.nonExistent}`);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
