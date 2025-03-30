 
class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchData(endpoint) {
    const response = await fetch(this.apiEndpoint + endpoint);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'getSecretData') {
      return function() {
        print("Attempting to access secret data");
        return Reflect.get(target, prop, receiver).apply(target, arguments);
      }
    }
    return Reflect.get(target, prop, receiver);
  }
};

const apiEndpoint = 'https://jsonplaceholder.typicode.com';
const proxy = new Proxy(new DataFetcher(apiEndpoint), handler);

(async function() {
  try {
    const data = await proxy.fetchData('/posts/1');
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }

   
  Reflect.set(proxy, 'getSecretData', async function() {
    return 'This is secret data!';
  });

  try {
    const secretData = await proxy.getSecretData();
    print('Secret Data:', secretData);
  } catch (error) {
    console.error('Error accessing secret data:', error);
  }
})();
