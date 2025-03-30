const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

class DataManager {
  #data = [];

  async loadData(urls) {
    const requests = urls.map(url => fetchData(url).catch(err => console.warn(`Failed to fetch: ${url}`, err)));
    this.#data = await Promise.all(requests);
  }

  *filterData(criteriaFn) {
    for (const item of this.#data.flat()) {
      if (criteriaFn(item)) yield item;
    }
  }

  async transformData(transformFn, delayMs = 0) {
    const transformed = [];
    for (const item of this.#data.flat()) {
      await delay(delayMs);
      transformed.push(transformFn(item));
    }
    this.#data = transformed;
  }

  getData() {
    return this.#data;
  }
}

(async () => {
  const manager = new DataManager();
  const urls = ['https://jsonplaceholder.typicode.com/posts', 'https://jsonplaceholder.typicode.com/users'];

  await manager.loadData(urls);

  const filtered = Array.from(manager.filterData(item => item.id % 2 === 0));
  print('Filtered Data:', filtered);

  await manager.transformData(item => ({ ...item, transformed: true }), 100);
  print('Transformed Data:', manager.getData());
})();
