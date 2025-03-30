 
async function* fetchDataGenerator(urls) {
  for (const url of urls) {
    yield fetch(url)
      .then(response => response.json())
      .catch(error => ({ error: `Failed to fetch: ${url}`, details: error }));
  }
}

 
const loggingHandler = {
  get: function(target, prop, receiver) {
    print(`Property accessed: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

 
async function fetchData(urls) {
  let responses = [];
  for await (let dataPromise of fetchDataGenerator(urls)) {
    responses.push(await dataPromise);
  }
  return new Proxy(responses, loggingHandler);
}

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];

 
async function main() {
  const data = await fetchData(urls);
  
  print(data[0]?.title ?? 'Title not available');
  print(data[1]?.description ?? 'Description not available');
}

main();
