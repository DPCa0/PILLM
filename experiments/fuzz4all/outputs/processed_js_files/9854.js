 
async function fetchAndProxyData(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
     
    const handler = {
      get: (target, prop) => {
        if (prop in target) {
          print(`Accessing property "${prop}" with value: ${target[prop]}`);
          return target[prop];
        }
        throw new Error(`Property "${prop}" does not exist`);
      },
      set: (target, prop, value) => {
        print(`Setting property "${prop}" with value: ${value}`);
        target[prop] = value;
        return true;
      }
    };
    
    const proxiedData = new Proxy(data, handler);
    
     
    print(proxiedData.someProperty);
    proxiedData.someProperty = 'newValue';
    
    return proxiedData;
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
async function processData(urls) {
  const results = [];
  for await (const url of urls) {
    const data = await fetchAndProxyData(url);
    if (data) results.push(data);
  }
  return results;
}

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
];

processData(urls)
  .then(results => {
    print('Processed data:', results);
  })
  .catch(error => {
    console.error('Error processing data:', error);
  });
