class DataLoader {
  #cache = new Map();

  constructor(urls) {
    this.urls = urls;
  }

  async #fetchData(url) {
    if (this.#cache.has(url)) {
      print(`Returning cached data for ${url}`);
      return this.#cache.get(url);
    }
    const response = await fetch(url);
    const data = await response.json();
    this.#cache.set(url, data);
    return data;
  }

  loadAllData() {
    return Promise.all(this.urls.map(url => this.#fetchData(url)));
  }
}

function* dataProcessor(dataSets) {
  for (const dataSet of dataSets) {
    yield* dataSet.filter(item => item.isActive).map(item => item.name);
  }
}

(async () => {
  const loader = new DataLoader([
    'https://api.example.com/data1',
    'https://api.example.com/data2'
  ]);

  try {
    const dataSets = await loader.loadAllData();
    const processor = dataProcessor(dataSets);

    for (const activeName of processor) {
      print(activeName);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
})();
