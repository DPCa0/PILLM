const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  filterData(callback) {
    return new DataProcessor(this.data.filter(callback));
  }

  mapData(callback) {
    return new DataProcessor(this.data.map(callback));
  }

  reduceData(callback, initialValue) {
    return this.data.reduce(callback, initialValue);
  }

  async asyncFilter(callback) {
    const promises = this.data.map(async (item) => await callback(item));
    const results = await Promise.all(promises);
    return new DataProcessor(this.data.filter((_, index) => results[index]));
  }
}

const processData = async () => {
  try {
    const url = 'https://api.example.com/data';
    const data = await fetchData(url);
    const processor = new DataProcessor(data);

    const result = await processor
      .filterData(item => item.value > 10)
      .mapData(item => ({ ...item, value: item.value * 2 }))
      .asyncFilter(async item => {
        const isValid = await someAsyncValidationFunction(item);
        return isValid;
      });

    print(result.reduceData((acc, item) => acc + item.value, 0));
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

const someAsyncValidationFunction = async (item) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(item.value % 2 === 0);
    }, 100);
  });
};

processData();
