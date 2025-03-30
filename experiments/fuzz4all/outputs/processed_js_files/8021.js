const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class DataProcessor {
  #data;
  constructor(data) {
    this.#data = data;
  }

  *filterData(criteria) {
    for (const item of this.#data) {
      if (criteria(item)) yield item;
    }
  }

  async process() {
    const results = [];
    for await (const item of this.#fetchDataFromAPI()) {
      results.push(item);
    }
    return results;
  }

  async *#fetchDataFromAPI() {
    const dataFromAPI = await fetchData('https://jsonplaceholder.typicode.com/posts');
    for (const item of dataFromAPI) {
      yield item;
    }
  }
}

(async () => {
  try {
    const data = [
      { id: 1, name: 'Alice', active: true },
      { id: 2, name: 'Bob', active: false },
      { id: 3, name: 'Charlie', active: true }
    ];

    const processor = new DataProcessor(data);
    print([...processor.filterData(item => item.active)]);

    const apiData = await processor.process();
    print(apiData.slice(0, 3));  
  } catch (error) {
    console.error('Error:', error);
  }
})();
