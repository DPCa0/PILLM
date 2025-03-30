class AsyncDataLoader {
  #data;  

  constructor(urls) {
    this.urls = urls;
    this.#data = [];
  }

  async *fetchData() {
    for (const url of this.urls) {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      yield response.json();
    }
  }

  async loadAllData() {
    try {
      for await (const data of this.fetchData()) {
        this.#data.push(data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  get data() {
    return this.#data;
  }
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
];

(async () => {
  const dataLoader = new AsyncDataLoader(urls);

   
  const dataLoaderProxy = new Proxy(dataLoader, {
    get(target, prop) {
      if (prop === 'data') {
        print('Data accessed');
        return Reflect.get(target, prop);
      }
      return Reflect.get(target, prop);
    }
  });

  await dataLoaderProxy.loadAllData();
  print(dataLoaderProxy.data);
})();
