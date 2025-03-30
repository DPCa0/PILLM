const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

class DataProcessor {
  #data;

  constructor(data) {
    this.#data = data;
  }

  filterBy(criteria) {
    return this.#data.filter(item => Object.keys(criteria).every(key => item[key] === criteria[key]));
  }

  transform(callback) {
    return this.#data.map(callback);
  }

  sortBy(key) {
    return [...this.#data].sort((a, b) => (a[key] > b[key] ? 1 : -1));
  }

  static async createFromURL(url) {
    const data = await fetchData(url);
    return new DataProcessor(data);
  }
}

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const processor = await DataProcessor.createFromURL(url);

  const filtered = processor.filterBy({ userId: 1 });
  const transformed = processor.transform(item => ({ ...item, title: item.title.toUpperCase() }));
  const sorted = processor.sortBy('id');

  print('Filtered:', filtered);
  print('Transformed:', transformed);
  print('Sorted:', sorted);
})();
