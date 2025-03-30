 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    return await response.json();
  }

  static async *dataGenerator(urls) {
    for (const url of urls) {
      const fetcher = new DataFetcher(url);
      yield await fetcher.fetchData();
    }
  }
}

const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property "${prop}" does not exist on target object.`);
      return undefined;
    }
  }
};

const urls = [
  'https://api.github.com/users/github',
  'https://api.github.com/users/microsoft'
];

(async () => {
  const proxy = new Proxy({}, handler);
  const generator = DataFetcher.dataGenerator(urls);

  for await (const data of generator) {
    const userData = Object.assign(proxy, data);
    print(`User: ${userData.login} - URL: ${userData.html_url}`);
  }
})();
