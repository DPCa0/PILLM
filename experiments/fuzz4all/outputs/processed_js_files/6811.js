 

 
async function fetchData(url) {
  const proxyHandler = {
    get(target, prop) {
      print(`Fetching ${prop}`);
      return target[prop];
    }
  };

  let response = await fetch(url);
  let proxyResponse = new Proxy(response, proxyHandler);

  if (!proxyResponse.ok) {
    throw new Error(`Network response was not ok ${proxyResponse.statusText}`);
  }
  return proxyResponse.json();
}

 
function* dataProcessor(data) {
  for (let item of data) {
    yield `Processed Item: ${item.name.toUpperCase()}`;
  }
}

 
(async function() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const data = await fetchData(url);
    
    const processor = dataProcessor(data);
    for (let result of processor) {
      print(result);
    }
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
