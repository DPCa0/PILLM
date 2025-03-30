const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

class DataProcessor {
  #data;

  constructor(data) {
    this.#data = data;
  }

  filterData(criteria) {
    return this.#data.filter(item => criteria(item));
  }

  async processDataAsync(transformFunc) {
    const processedData = [];
    for (const item of this.#data) {
      processedData.push(await transformFunc(item));
    }
    return processedData;
  }
}

const url = 'https://jsonplaceholder.typicode.com/posts';
(async () => {
  const data = await fetchData(url);
  const processor = new DataProcessor(data);
  
  const filtered = processor.filterData(post => post.userId === 1);
  print('Filtered Data:', filtered);
  
  const transformed = await processor.processDataAsync(async post => ({
    ...post,
    title: post.title.toUpperCase()
  }));
  
  print('Transformed Data:', transformed);
})();
