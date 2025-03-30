const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  *filterData(criteria) {
    for (const item of this.data) {
      if (criteria(item)) yield item;
    }
  }

  async transformData(transformFn) {
    this.data = this.data.map(transformFn);
    await new Promise((resolve) => setTimeout(resolve, 1000));  
    return this;
  }
}

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const processor = new DataProcessor(data);

    const filteredData = [...processor.filterData(item => item.userId === 1)];
    print('Filtered Data:', filteredData);

    const transformedProcessor = await processor.transformData(item => ({
      ...item,
      title: item.title.toUpperCase()
    }));

    print('Transformed Data:', transformedProcessor.data);

  } catch (error) {
    console.error('Error:', error);
  }
})();
