class AsyncUtil {
  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }
}

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  static #privateHelper(data) {
    return data.filter(item => item.isActive).map(item => item.name.toUpperCase());
  }

  process() {
    return DataProcessor.#privateHelper(this.data);
  }
}

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const data = await AsyncUtil.fetchData(url);
    const processor = new DataProcessor(data);

    const processedData = processor.process();
    print(processedData);

     
    const [first, ...rest] = processedData;
    print('First processed item:', first);
    print('Rest of processed items:', rest);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
