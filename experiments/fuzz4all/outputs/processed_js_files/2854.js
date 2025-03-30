const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class DataProcessor {
  static #cache = new Map();

  constructor(data) {
    this.data = data;
  }

  static async fromURL(url) {
    if (this.#cache.has(url)) return new DataProcessor(this.#cache.get(url));
    const data = await fetchData(url);
    this.#cache.set(url, data);
    return new DataProcessor(data);
  }

  filterData(predicate) {
    return new DataProcessor(this.data.filter(predicate));
  }

  mapData(transform) {
    return new DataProcessor(this.data.map(transform));
  }

  reduceData(reducer, initialValue) {
    return this.data.reduce(reducer, initialValue);
  }
}

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const processor = await DataProcessor.fromURL(url);

    const titles = processor
      .filterData(post => post.userId === 1)
      .mapData(post => post.title)
      .reduceData((acc, title) => acc + '\n' + title, 'User 1 Titles:');

    print(titles);
  } catch (error) {
    console.error('Error:', error);
  }
})();
