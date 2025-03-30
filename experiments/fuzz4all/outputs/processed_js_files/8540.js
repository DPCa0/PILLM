const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

class DataProcessor {
  #data;
  
  constructor() {
    this.#data = [];
  }

  async load(url) {
    this.#data = await fetchData(url);
  }

  filterData(predicate) {
    return this.#data.filter(predicate);
  }

  get sortedData() {
    return [...this.#data].sort((a, b) => a.value - b.value);
  }
}

const process = async (url) => {
  const processor = new DataProcessor();
  await processor.load(url);

  const filtered = processor.filterData(item => item.value > 10);
  print('Filtered Data:', filtered);

  const sorted = processor.sortedData;
  print('Sorted Data:', sorted);
};

(async () => {
  const url = 'https://api.example.com/data';
  await process(url);
})();
