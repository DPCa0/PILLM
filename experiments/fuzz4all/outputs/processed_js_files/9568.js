 
async function* fetchData(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
      const data = await response.json();

       
      const proxyHandler = {
        get(target, property) {
          print(`Accessing property: ${property}`);
          return target[property];
        },
      };
      yield new Proxy(data, proxyHandler);
    } catch (error) {
      console.error(`Error processing URL ${url}: ${error.message}`);
    }
  }
}

 
class APIHandler {
  #urls;
  constructor(urls) {
    this.#urls = urls;
  }

  async #processData() {
     
    for await (const data of fetchData(this.#urls)) {
      print('Processed Data:', data);
    }
  }

  process() {
    print('Starting data processing...');
    this.#processData();
  }
}

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
];

 
const results = new Map();
results.set('status', 'initialized');

 
const apiHandler = new APIHandler(urls);
apiHandler.process();

 
const apiProxy = new Proxy(apiHandler, {
  get(target, property) {
    print(`Invoked method: ${property}`);
    return target[property];
  },
});

 
apiProxy.process();
