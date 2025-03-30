 

class ApiService {
  constructor(url) {
    this.url = url;
  }

  async fetchData(endpoint) {
    const response = await fetch(`${this.url}${endpoint}`);
    return response.json();
  }
}

class Logger {
  static log(message) {
    print(`[${new Date().toISOString()}] ${message}`);
  }
}

const serviceHandler = {
  get(target, prop) {
    if (prop === 'fetchData') {
      return async function (...args) {
        Logger.log(`Fetching data from endpoint: ${args[0]}`);
        return target[prop](...args);
      };
    }
    return target[prop];
  }
};

async function main() {
  const apiService = new ApiService('https://jsonplaceholder.typicode.com');
  const proxiedService = new Proxy(apiService, serviceHandler);

  try {
    const data = await proxiedService.fetchData('/posts/1');
    Logger.log(`Data received: ${JSON.stringify(data)}`);
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
  }
}

main();
