const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  static async init(url) {
    const data = await fetchData(url);
    return new DataProcessor(data);
  }

  processData() {
    return this.data.reduce((acc, item) => {
      const { category, value } = item;
      acc[category] = (acc[category] || 0) + value;
      return acc;
    }, {});
  }

  [Symbol.iterator]() {
    let index = 0;
    const data = Object.entries(this.processData());
    return {
      next: () => {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { done: true };
      },
    };
  }
}

(async () => {
  const url = 'https://api.example.com/data';
  try {
    const processor = await DataProcessor.init(url);
    for (const [category, value] of processor) {
      print(`Category: ${category}, Total Value: ${value}`);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
