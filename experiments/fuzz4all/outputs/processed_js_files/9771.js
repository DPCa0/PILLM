 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return target[prop];
    }
    print(`Property ${prop} does not exist`);
    return null;
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const dataProxy = new Proxy({}, handler);

 
async function* processAsyncData(urls) {
  for (let url of urls) {
    try {
      const data = await fetchData(url);
      dataProxy[url] = data;  
      yield data;
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);
    }
  }
}

 
const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];

(async () => {
  const asyncGen = processAsyncData(urls);
  
  for await (let result of asyncGen) {
    print('Processed data:', result);
  }

   
  print(dataProxy['https://jsonplaceholder.typicode.com/posts/1']);  
  print(dataProxy['nonexistent']);  
})();
