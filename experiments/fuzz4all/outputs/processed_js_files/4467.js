const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  filterByCategory(category) {
    return this.data.filter(item => item.category === category);
  }

  async *processData(categories) {
    for (const category of categories) {
      yield new Promise(resolve => 
        setTimeout(() => resolve(this.filterByCategory(category)), 1000)
      );
    }
  }
}

const url = 'https://api.example.com/data';
(async () => {
  try {
    const data = await fetchData(url);
    const processor = new DataProcessor(data);
    const categories = ['electronics', 'furniture', 'clothing'];
    
    for await (const processedData of processor.processData(categories)) {
      print('Processed Data:', processedData);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
