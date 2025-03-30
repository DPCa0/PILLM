class NetworkRequest {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }
}

async function* dataProcessor(data) {
  for (let item of data) {
    yield item * 2;  
  }
}

async function run() {
  try {
    const networkRequest = new NetworkRequest('https://jsonplaceholder.typicode.com/posts');
    const data = await networkRequest.fetchData();

     
    const handler = {
      get: function (target, prop, receiver) {
        if (prop in target) {
          print(`Accessing property: ${prop}`);
          return Reflect.get(target, prop, receiver);
        }
        console.warn(`Property ${prop} does not exist!`);
        return undefined;
      }
    };

    const proxyData = new Proxy(data, handler);

    const processedData = dataProcessor(proxyData.map(item => item.id));

    for await (let processedItem of processedData) {
      print(`Processed Item: ${processedItem}`);
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

run();
