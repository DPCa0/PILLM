 

 
const fetchInterceptor = new Proxy(fetch, {
  apply: async function(target, thisArg, args) {
    print(`Fetching URL: ${args[0]}`);
    const response = await target.apply(thisArg, args);
    const jsonData = await response.json();
    print('Received Response:', jsonData);
    return jsonData;
  }
});

 
function* apiEndpoints() {
  yield 'https://jsonplaceholder.typicode.com/posts/1';
  yield 'https://jsonplaceholder.typicode.com/posts/2';
  yield 'https://jsonplaceholder.typicode.com/posts/3';
}

 
async function fetchDataFromAPIs() {
  const endpoints = apiEndpoints();
  for (let endpoint of endpoints) {
    const data = await fetchInterceptor(endpoint);
    print('Data:', data);
  }
}

 
fetchDataFromAPIs().catch(console.error);
