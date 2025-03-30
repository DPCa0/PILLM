 

 
const loggingHandler = {
  get(target, propKey, receiver) {
    const origMethod = target[propKey];
    return function (...args) {
      print(`Called ${propKey} with args: ${JSON.stringify(args)}`);
      return origMethod.apply(this, args);
    };
  }
};

 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

 
function* processInChunks(data, chunkSize) {
  for (let i = 0; i < data.length; i += chunkSize) {
    yield data.slice(i, i + chunkSize);
  }
}

 
async function main() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(url);

  const chunkProcessor = processInChunks(data, 5);
  for (let chunk of chunkProcessor) {
    print('Processing chunk:', chunk);
    await new Promise(resolve => setTimeout(resolve, 1000));  
  }
}

 
const proxiedMain = new Proxy(main, loggingHandler);

 
proxiedMain().catch(err => console.error('Error:', err));
