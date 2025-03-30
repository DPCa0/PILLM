class DataFetcher {
  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }
}

class ComputationEngine {
  #cache = new WeakMap();

  compute(data) {
    if (this.#cache.has(data)) {
      print('Returning cached result');
      return this.#cache.get(data);
    }
    const result = data.reduce((acc, value) => acc + value, 0);
    this.#cache.set(data, result);
    return result;
  }
}

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  try {
    const data = await DataFetcher.fetchData(url);
    const engine = new ComputationEngine();
    const numbers = data.map(item => item.id);
    print('Computed result:', engine.compute(numbers));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
